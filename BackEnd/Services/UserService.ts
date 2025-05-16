import { User } from '../Models/User';
import { UserDAO } from '../DAO/UserDAO';
import { seedUsers } from '../Data/seedUsers';
import { hashPassword, verifyPassword } from '../Utils/cryptoUtils';

/**
 * Servizio per la gestione degli utenti.
 * Usa un'istanza di UserDAO.
 */
const userDAO = new UserDAO();

/**
 * Inizializza gli utenti di default nel sistema se non esistono già facendo riferimento al seedUsers.
 */
export async function initializeUsers(): Promise<void> {
for (const data of seedUsers) {
  const existingUser = await userDAO.findByUsername(data.username);
    if (!existingUser) {
      const passwordHash = await hashPassword(data.password);
      const newUser = new User(
        data.id,
        data.username,
        passwordHash,
        data.role,
        data.name,
        data.city,
        data.address,
        data.streetNumber,
        data.companyLogo,
      );
      await userDAO.save(newUser);
    }
  }
}

/**
 * Effettua il login di un utente verificando username e password.
 * @throws Error se le credenziali non sono valide.
 */
export async function loginUser(username: string, password: string, walletAddress: string): Promise<User> {
  const user = await userDAO.findByUsername(username);
  if (!user) {
    throw new Error('Utente non trovato');
  }

  // Verifica la password hashata
  const isPasswordValid = await verifyPassword(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error('Password errata');
  }

  // Verifica l'indirizzo del wallet
  if (user.walletAddress !== walletAddress) {
    throw new Error('Indirizzo wallet non valido');
  }

  return user;
}

/**
 * Collega un indirizzo wallet a un utente esistente.
 * @throws Error se l'utente non viene trovato.
 */
export async function linkWallet(userId: number, walletAddress: string): Promise<User> {
  const user = await userDAO.findById(userId);
  if (!user) {
    throw new Error('Utente non trovato');
  }

  user.walletAddress = walletAddress;
  await userDAO.update(user);
  return user;
}

/**
 * Recupera un utente dato il suo ID.
 */
export async function getUserById(userId: number): Promise<User | undefined> {
  return await userDAO.findById(userId);
}