import { User } from '../Models/User';
import { UserWallet } from '../Models/UserWallet';
import { UserDAO } from '../DAO/UserDAO';
import { hashPassword, verifyPassword } from '../Utils/cryptoUtils';
import { UserWalletDAO } from '../DAO/UserWalletDAO';
import { UserDTO } from '../Models/UserDTO';
import { UserDebt } from '../Models/UserDebt';
import { DebtsDAO } from '../DAO/DebtsDAO';

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
export async function signUpUser(username: string, password: string,
  role: string, name: string, city: string, address: string, walletAddress: string, serialCode: string):
  Promise<Boolean> {
  const existingUser = await userDAO.findByUsername(username);
  if (existingUser) {
    throw new Error('Username già in uso');
  }
  const passwordHash = await hashPassword(password);
  const user = new User(
    0,
    username,
    passwordHash,
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
  console.log(validCode);
  if (!validCode) {
    throw new Error('Serial code non valido');
  }

  //Salviamo l'utente
  const userid = await userDAO.save(user);

  //Link del wallet all'utente
  const userWallet = new UserWallet(userid, 0, walletAddress);
  linkWallet(userid, userWallet);

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
    role: user.role,
    name: user.name,
    city: user.city,
    address: user.address,
    wallet_address: user.wallet?.address,
    wallet_balance: user.wallet?.balance,
  }));

  return usersDTO;

}

export async function getUsersWithDebt(id: number): Promise<UserDebt[]> {
  // individuo gli utenti con debito eccetto l'utente che sta cercando
  const usersWithDebt = await debtsDAO.findAllExceptUserId(id);

  if (usersWithDebt.length === 0) {
    return [];
  }

  const usersDebt = await Promise.all(
    usersWithDebt.map(
      async user => {
        const { name, role } = await userDAO.findNameRoleById(user.id_user);
        return { id: user.id_user, name: name, role: role, debt: user.debt };
      }));
  /* 
    const usersDebt: UserDebt[] = totalUsersId.map(user => ({
      id: user.id,
      name: user.name,
      role: user.role,
      debt: user.debt
    })); */

  return usersDebt;
}


