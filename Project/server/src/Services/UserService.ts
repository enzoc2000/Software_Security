import { User } from '../Models/User';
import { UserWallet } from '../Models/UserWallet';
import { UserDAO } from '../DAO/UserDAO';
import { hashPassword, verifyPassword } from '../Utils/cryptoUtils';
import { UserWalletDAO } from '../DAO/UserWalletDAO';

/**
 * Servizio per la gestione degli utenti.
 * Usa un'istanza di UserDAO.
 */
const userDAO = new UserDAO();
const userWalletDAO = new UserWalletDAO();

/**
 * Inizializza gli utenti di default nel sistema se non esistono già facendo riferimento al seedUsers.
 */
export async function signUpUser(username: string, password: string, 
  role: string, name: string, city: string, address: string, streetNumber: string, companyLogo: string): 
  Promise<Boolean> {
    // todo aggiungere il controllo anche sul walletAddress
    const existingUser = await userDAO.findByUsername(username);
    if (!existingUser) {
      const passwordHash = await hashPassword(password);
      const user = new User(
        0,
        username,
        passwordHash,
        role,
        name,
        city,
        address,
        streetNumber,
        companyLogo,
      );
      await userDAO.save(user);
      return true;
    }
    else
      throw new Error('Username già in uso');
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
  if (user.wallet?.address !== walletAddress) {
    throw new Error('Indirizzo wallet non valido');
  }

  return user;
}

/**
 * Collega un indirizzo wallet a un utente esistente.
 * @throws Error se l'utente non viene trovato.
 */
export async function linkWallet(userId: number, wallet: UserWallet): Promise<User> {
  const user = await userDAO.findById(userId);
  if (!user) {
    throw new Error('Utente non trovato');
  }

  user.wallet = wallet;
  await userWalletDAO.save(wallet);
  await userDAO.update(user);
  return user;
}

/**
 * Recupera un utente dato il suo ID.
 */
export async function getUserById(userId: number): Promise<User | undefined> {
  return await userDAO.findById(userId);
}