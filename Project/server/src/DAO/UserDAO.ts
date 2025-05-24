import { User } from '../Models/User';
import { db } from '../Config/db';
import { UserWalletDAO } from './UserWalletDAO';
import { UserWallet } from '../Models/UserWallet';
import { compare } from 'bcryptjs';
import { verifyPassword } from '../Utils/cryptoUtils';

/**
 * DAO per la gestione dell'accesso ai dati utente
 * Questa classe fornisce metodi per salvare, recuperare e aggiornare gli utenti nel database.
 * Utilizza il modulo db per eseguire query SQL.
 */
export class UserDAO {
  
  //Salvataggio di un utente 
  async save(user: User): Promise<number> {
    const [result]: any = await db.execute(
    `INSERT INTO users 
      (username, password_hash, role, name, city, address) 
      VALUES (?, ?, ?, ?, ?, ?)`,
    [
      user.username,
      user.passwordHash,
      user.role,
      user.name,
      user.city,
      user.address
    ]
    );

    // Restituisce l'ID dell'utente appena creato
    return result.insertId;
  }
  
  //Recupero di un utente tramite username
  async findByUsername(username: string): Promise<User | undefined> {
    const [rows]: any = await db.execute(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );

    if (rows.length === 0) 
      return;

    const row = rows[0];
    const user: User = this.mapRowToUser(row);
    // Se l'utente ha un wallet associato, lo recupero
    const walletDAO = new UserWalletDAO();
    const wallet = await walletDAO.findByUserId(user.id);
    if (wallet)
      user.wallet = wallet;
    return user;
  }

  //Recupero di un utente tramite ID
  async findById(userId: number): Promise<User> {
    const [rows]: any = await db.execute(
      `SELECT * FROM users WHERE id_user = ?`,
      [userId]
    );

    if (rows.length === 0) 
      throw new Error("Utente non trovato");

    const walletDAO = new UserWalletDAO();
    const wallet = await walletDAO.findByUserId(userId);
    const row = rows[0];
    return this.mapRowToUser(row, wallet);
  }

  //Controllo della validità di un seriale code
  //Restituisce true se il serial code è valido e non è stato utilizzato
  async checkSerialCode(serialCode: string): Promise<string | false> {
    const [rows]: any = await db.execute(
      `SELECT * FROM serial_codes WHERE is_used = FALSE`
    );
    console.log(serialCode);
    console.log(rows);

    if (rows.length === 0) 
      return false;

    for (const row of rows) {
      const isCodeValid = await verifyPassword(serialCode, row.serial_code);
      if (isCodeValid) {
        return row.serial_code;
      }
    }
    return false;
  }

  //Aggiornamento del serial code come utilizzato
  async updateSerialCode(serialCode: string): Promise<void> {
    await db.execute(
      `UPDATE serial_codes SET is_used = TRUE WHERE serial_code = ?`,
      [serialCode]
    );
  }
  
  //Aggiornamento di un utente
  async update(user: User): Promise<void> {
    await db.execute(
      `UPDATE users SET 
        username = ?, 
        password_hash = ?, 
        role = ?, 
        name = ?, 
        city = ?, 
        address = ?
      WHERE id_user = ?`,
      [
        user.username,
        user.passwordHash,
        user.role,
        user.name,
        user.city,
        user.address,
        user.id
      ]
    );
  }

  // Fuznione che recupera di tutti gli utenti tranne quello con lo username specificato
  async findAllExceptUserId(id: number): Promise<User[]> {
    const [rows]: any = await db.execute(
      `SELECT * FROM users WHERE id_user != ?`,
      [id]
    );

    if (rows.length === 0) 
        throw new Error('Utenti non trovati');

    const walletDAO = new UserWalletDAO();
    const users: User[] = [];

    for (const row of rows) {
      const wallet = await walletDAO.findByUserId(row.id_user);
      const user = this.mapRowToUser(row, wallet);
      users.push(user);
    }

    return users; 
  }

  // Funzione di utilità per convertire una riga del DB in un oggetto User
  private mapRowToUser(row: any, wallet?: UserWallet): User {
    return new User(
      row.id_user,
      row.username,
      row.password_hash,
      row.role,
      row.name,
      row.city,
      row.address,
      wallet
    );
  }
}