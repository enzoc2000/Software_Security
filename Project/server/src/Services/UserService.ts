import { User } from '../Models/User';
import { UserWallet } from '../Models/UserWallet';
import { UserDAO } from '../DAO/UserDAO';
import { hashPassword, verifyPassword } from '../Utils/cryptoUtils';
import { UserWalletDAO } from '../DAO/UserWalletDAO';
import { UserDTO } from '../Models/UserDTO';
import { UserDebtDTO } from '../Models/UserDebtDTO';
import { DebtsDAO } from '../DAO/DebtsDAO';
import { ethNewUser } from './TokenService';

/**
 * Servizio per la gestione degli utenti.
 * Usa un'istanza di UserDAO.
 */
const userDAO = new UserDAO();
const userWalletDAO = new UserWalletDAO();
const debtsDAO = new DebtsDAO();

/**
 * Inizializza gli utenti di default nel sistema se non esistono già facendo riferimento al seedUsers.
 */
export async function signUpUser(username: string, password: string, email: string,
  role: string, name: string, city: string, address: string, walletAddress: string, serialCode: string):
  Promise<Boolean> {
  const existingUser = await userDAO.findByUsername(username);
  if (existingUser) {
    throw new Error('Username già in uso');
  }
  const passwordHash = await hashPassword(password);

  //Controllo se l'email è già in uso
  const existingEmail = await userDAO.findByEmail(email);
  if (existingEmail) {
    throw new Error('Email già in uso');
  }
  //Creazione dell'utente
  const user = new User(
    0,
    username,
    passwordHash,
    email,
    role,
    name,
    city,
    address,
  );

  //Controllo se walletAddress è già in uso
  const existingWallet = await userWalletDAO.findByAddress(walletAddress);
  if (existingWallet) {
    throw new Error('Indirizzo wallet già in uso');
  }

  //Controllo validità del serial code
  const validCode = await userDAO.checkSerialCode(serialCode);
  if (!validCode) {
    throw new Error('Serial code non valido');
  }

  //Salviamo l'utente
  const userid = await userDAO.save(user);

  //Link del wallet all'utente e assegnazione moneta iniziale
  const userWallet = new UserWallet(userid, 0, walletAddress);
  linkWallet(userid, userWallet);
  //Assegna 100 unità di moneta iniziale
  ethNewUser(userWallet.address);

  //Aggiorniamo il serial code come utilizzato
  await userDAO.updateSerialCode(validCode);

  //Ogni volta che si crea un utente, si imposta il suo debito a 0
  await debtsDAO.save(userid, 0);

  return true;
}

/**
 * Effettua il login di un utente verificando username e password.
 * @throws Error se le credenziali non sono valide.
 */
export async function loginUser(username: string, password: string, walletAddress: string): Promise<UserDTO> {
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

  // Mappa User → DTO
  const userDTO: UserDTO = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    city: user.city,
    address: user.address,
    wallet_address: user.wallet?.address,
    wallet_balance: user.wallet?.balance,
  };

  return userDTO;
}

export async function modifyUser(username: string, password: string, email: string, name: string, city: string, address: string, userId: number): Promise<boolean> {
  const existingUser = await userDAO.findById(userId);
  if (!existingUser) {
    return false;
  }
  let newPassword;
  if (password !== '') {
    newPassword = await hashPassword(password);
  }
  if (username !== ''){
    existingUser.username = username
  }
  existingUser.name = name;
  existingUser.email = email;
  existingUser.city = city;
  existingUser.address = address;
  await userDAO.mofify(existingUser, newPassword);
  return true;
}

/**
 * Collega un indirizzo wallet a un utente esistente.
 * @throws Error se l'utente non viene trovato.
 */
export async function linkWallet(userId: number, wallet: UserWallet): Promise<UserDTO> {
  const user = await userDAO.findById(userId);
  if (!user) {
    throw new Error('Utente non trovato');
  }

  user.wallet = wallet;
  await userWalletDAO.save(wallet);
  await userDAO.update(user);

  // Mappa User → DTO
  const userDTO: UserDTO = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    city: user.city,
    address: user.address,
    wallet_address: user.wallet?.address,
    wallet_balance: user.wallet?.balance,
  };

  return userDTO;
}

/**
 * Recupera un utente dato il suo ID.
 */
export async function getUserById(userId: number): Promise<UserDTO> {
  const user = await userDAO.findById(userId);
  if (!user.wallet) {
    throw new Error('Wallet non trovato')
  }
  // Mappa User → DTO
  const userDTO: UserDTO = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    city: user.city,
    address: user.address,
    wallet_address: user.wallet?.address,
    wallet_balance: user.wallet?.balance,
  };

  return userDTO;
}

//Funzione che recuper tutti gli utenti nel db eccetto quello riferito all'ID che si passa alla funzione 
export async function getUsersExcept(id: number): Promise<UserDTO[]> {
  const users = await userDAO.findAllExceptUserId(id);
  if (users.length === 0) {
    return [];
  }

  const usersDTO: UserDTO[] = users.map(user => ({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    city: user.city,
    address: user.address,
    wallet_address: user.wallet?.address,
    wallet_balance: user.wallet?.balance,
  }));

  return usersDTO;

}

export async function getUsersWithDebt(id: number): Promise<{ usersDebt: UserDebtDTO[], userDebt: number }> {
  // individuo gli utenti con debito eccetto l'utente che sta cercando
  const usersWithDebt = await debtsDAO.findAllExceptUserId(id);
  const userDebt = await debtsDAO.findByUserId(id);

  if (usersWithDebt.length === 0) {
    return {
      usersDebt: [],
      userDebt: userDebt
    };
  }

  const usersDebt: UserDebtDTO[] = await Promise.all(
    usersWithDebt.map(
      async user => {
        const utente = await userDAO.findById(user.id_user);
        return { id: user.id_user, name: utente.name, role: utente.role, debt: user.debt, wallet_address: utente.wallet?.address || "" };
      }));

  return { usersDebt, userDebt };
}