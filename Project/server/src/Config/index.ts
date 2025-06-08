// filepath: src/index.ts
// api di prova
import express, { Request, Response } from "express";
import cors from 'cors';
import jwt from "jsonwebtoken";
import { getUserById, getUsersExcept, getUsersWithDebt, loginUser, modifyUser, signUpUser } from "../Services/UserService";
import { authMiddleware } from "../middleware/auth";
import { getEmissionsAndTresholdByUser, getLatestEmissions, submitEmission } from "../Services/DataService";
import { checkBalances, confirmBurn, getAllTransactions, removeCarbonCredits } from "../Services/TokenService";
import { BurnRequestDTO } from "../Models/BurnRequestDTO";
import { withTimeout } from "../Utils/withTimeout";
import { sendOTPEmail } from "../Utils/sendOtpEmail";
import { get } from "http";
import { UserDAO } from "../DAO/UserDAO";
const app = express();
app.use(cors()); // Consenti al frontend di fare richieste
app.use(express.json());

const PORT = process.env.SERVER_PORT || 3010; // Imposta un valore di default per SERVER_PORT
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Imposta un valore di default per JWT_SECRET

if (!JWT_SECRET || !PORT) {
  console.error("❌ SERVER_PORT o JWT_SECRET non definiti in .env");
  process.exit(1);
}

const otps = new Map<number, { code: string; expires: number }>();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server backend attivo" });
});

app.get(
  "/api/profilo",
  authMiddleware,                    // <— applica il controllo del JWT
  async (req: Request, res: Response): Promise<void> => {
    console.log(req.userId);
    try {
      // req.userId è stato valorizzato dal middleware
      const user = await getUserById(req.userId!);
      if (!user) {
        res.status(404).json({ message: "Utente non trovato" });
      }
      // ritorna solo i campi “pubblici” del profilo
      const { id, email, role, name, city, address, wallet_address, wallet_balance } = user;
      res.status(200).json({
        id,
        email,
        role,
        name,
        city,
        address,
        wallet_address,
        wallet_balance
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Errore interno" });
    }
  }
);

app.post("/api/updateProfile", authMiddleware, async (req: Request, res: Response) => {
  const { userData, userCredentials } = req.body;
  try {
    const user = await loginUser(userCredentials.username, userCredentials.password, userCredentials.walletAddress);
    if (!user) {
      res.status(404).json({ message: "Not valid credentials" });
    }
    const updated = await modifyUser(
      userData.username,
      userData.password,
      userData.email,
      userData.name,
      userData.city,
      userData.address,
      user.id
    );
    if (!updated) {
      res.status(404).json({ message: "Modification failed" });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore interno" });
  }
})

app.post("/api/login", async (req: Request, res: Response) => {
  const { username, password, walletAddress } = req.body;

  try {
    // 1. Verifica le credenziali con loginUser
    const user = await loginUser(username, password, walletAddress);

    if (!user) {
      // Login fallito
      res.status(401).json({ message: "Credenziali non valide" });
    }
    // 2. Genera un OTP casuale a 6 cifre e ne calcola la scadenza (5 minuti)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000; // scade in 5 minuti

    // 3. Salva l’OTP in memoria (Map)
    otps.set(user.id, { code: otp, expires });

    // 4. Invia l’email con il codice OTP
    const url = await sendOTPEmail(user.email, otp);
    console.log("OTP inviato");
    console.log(user.id);
    // 5. Rispondi al client “OTP inviato”
    res.status(200).json({ userId: user.id, urlEmail: url });
    return;
  } catch (error: any) {
    console.error("Errore durante il login:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

app.post("/api/verify-otp", async (req: Request, res: Response) => {
  const { userId, code } = req.body as { userId: number, code: string };
  const entry = otps.get(userId);

  // 1. OTP mancante, errato o scaduto
  if (!entry || entry.code !== code || Date.now() > entry.expires) {
    res.status(401).json({ message: "OTP non valido o scaduto" });
    return;
  }

  // 2. OTP valido: recupera i dati utente veri (di solito fai loginUser di nuovo o tieni già i dati)
  //    Qui si assume che loginUser(username, ..., ...) restituisca ancora “user”
  const user = await getUserById(userId);
  if (!user) {
    res.status(404).json({ message: "Utente inesistente" });
    return;
  }

  // 3. Crea il payload e il JWT
  const payload = { userId: user.id, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });

  // 4. Cancella l’OTP dalla Map: non riutilizzarlo
  otps.delete(userId);

  // 5. Ritorna token + dati utente
  res.status(200).json({ utenteAutenticato: user, token });
  return;
});

app.post("/api/signUp", async (req: Request, res: Response) => {
  const { username,
    password,
    role,
    email,
    name,
    city,
    address,
    walletAddress,
    serialCode
  } = req.body;

  console.log("Tentativo signUp:", req.body);
  try {
    const okUser = await signUpUser(username, password, email, role, name, city, address, walletAddress, serialCode);
    if (okUser) {
      res.status(201).json({ success: true });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/listActors", authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.body;
  console.log("Tentativo listActors:", req.body);
  try {
    const users = await getUsersExcept(id);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore interno" });
  }
}
);

app.post("/api/submitEmissions", authMiddleware, async (req: Request, res: Response) => {
  const { profileId, co2Amount } = req.body;
  console.log("Attempt to submit emissions:", req.body);
  try {
    const response = await withTimeout(
      submitEmission(profileId, co2Amount),
      60000,
      "Submit emissions timed out"
    );
    if (!response) {
      res.status(404).json({ message: "Nessuna risposta" });
      return;
    }
    res.status(200).json(response);
  } catch (err: any) {
    console.error(err);
    if (err.message.includes("timed out")) {
      res.status(504).json({ message: "Submit emissions timed out" });
      return;
    }
    res.status(500).json({ message: "Errore interno" });
  }
}
);

app.post(
  "/api/submitBurn",
  authMiddleware,
  async (req: Request, res: Response) => {
    const burnRequest: BurnRequestDTO = {
      requiresBurn: req.body.requiresBurn,
      userId: req.body.userId,
      carbonCredits: req.body.carbonCredits,
      remainingDebt: req.body.remainingDebt,
      emissionAmount: req.body.emissionAmount,
      isDonation: req.body.isDonation,
      idRecipient: req.body.idRecipient,
      tx: req.body.tx
    };
    console.log("Attempt to submit burn:", req.body);
    try {
      await withTimeout(
        confirmBurn(burnRequest),
        60000,
        "Submit burn timed out"
      );
      res.status(200).json({ message: "Burn registrato con successo" });
      return;
    } catch (err: any) {
      console.error(err);
      if (err.message.includes("timed out")) {
        res.status(504).json({ message: "Submit burn timed out" });
        return;
      }
      res.status(500).json({ message: "Errore interno durante il submitBurn" });
    }
  }
);

app.post(
  "/api/removeCarbonCredits",
  authMiddleware,
  async (req: Request, res: Response) => {
    const {
      profileId,
      profileAddress,
      actorDebt,
      co2Amount,
      credits
    } = req.body;
    console.log("Attempt to remove carbon credits:", req.body);
    try {
      const burnRequest: BurnRequestDTO = await withTimeout(
        removeCarbonCredits(profileId, profileAddress, actorDebt, co2Amount, credits),
        60000,
        "Remove carbon credits timed out"
      );
      if (!burnRequest) {
        res.status(404).json({ message: "Nessuna risposta" });
        return;
      }
      res.status(200).json(burnRequest);
    } catch (err: any) {
      console.error(err);
      if (err.message.includes("timed out")) {
        res.status(504).json({ message: "Remove carbon credits timed out" });
        return;
      }
      res.status(500).json({ message: "Errore interno durante il submitBurn" });
    }
  }
);

app.post(
  "/api/emissionslog",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { profileId } = req.body;
    console.log("Attempt to log emissions:", req.body);
    try {
      const emissions = await getEmissionsAndTresholdByUser(profileId);
      res.status(200).json(emissions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Errore interno" });
    }
  }
);

app.post(
  "/api/transactionslog",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const transactions = await getAllTransactions();
      res.status(200).json(transactions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Errore interno" });
    }
  }
);

app.post(
  "/api/listActorsDebts",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { id } = req.body;
    console.log("Attempt to list actors debts:", req.body);
    try {
      const { usersDebt, userDebt } = await getUsersWithDebt(id);
      res.status(200).json({ usersDebt, userDebt });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: "Errore interno" });
    }
  }
);


app.post(
  "/api/listActorsLatestEmissions",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const usersLatestEmissions = await getLatestEmissions();
      res.status(200).json(usersLatestEmissions);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: "Errore interno" });
    }
  }
);


app.post(
  "/api/getBalance",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { profileAddress, profileId } = req.body;
    try {
      const userBalance = await withTimeout(
        checkBalances(profileAddress, profileId),
        10000,
        "Check balance timed out"
      );
      res.status(200).json(userBalance);
      return;
    }
    catch (err: any) {
      console.error(err);
      if (err.message.includes("timed out")) {
        res.status(504).json({ message: "Check balance timed out" });
        return;
      }
      res.status(500).json({ message: "Errore interno" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`✅ Server backend attivo su http://localhost:${PORT}`);
});