// filepath: src/index.ts
// api di prova
import express, { Request, Response } from "express";
import cors from 'cors'
import { loginUser, signUpUser } from "../Services/UserService";


const app = express();
app.use(cors()); // Consenti al frontend di fare richieste
app.use(express.json());
const PORT = process.env.PORT || 3010;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.post("/api/login", async (req: Request, res: Response) => {
  const { username, password, walletAddress } = req.body;

  console.log("Tentativo login:", + req.body );

  try {
    const user = await loginUser(username, password, walletAddress);
    console.log("Utente trovato:", user);
    if (user) {
      // Login riuscito
      res.status(200).json(user);
    } else {
      // Login fallito ma senza eccezioni
      res.status(401).json({ message: "Credenziali non valide" });
    }

  } catch (error: any) {
    console.error("Errore durante il login:", error);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

app.post("/api/signUp", async (req: Request, res: Response) => {
  const {username,
        password,
        role,
        name,
        city,
        address,
        streetNumber,
        companyLogo,
        walletAddress
  } = req.body;
  
  console.log("Tentativo signUp:", req.body);
  try {
    const okUser = await signUpUser(username, password, role, name, city, address, streetNumber, companyLogo, walletAddress);
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

app.listen(PORT, () => {
  console.log(`✅ Server backend attivo su http://localhost:${PORT}`);
});