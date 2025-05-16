import { User } from '../Models/User';
import { db } from '../Config/db';

/**
 * DAO per la gestione dell'accesso ai dati utente
 * Questa classe fornisce metodi per salvare, recuperare e aggiornare gli utenti nel database.
 * Utilizza il modulo db per eseguire query SQL.
 */
export class UserDAO {
  
  //Salvataggio di un utente 
  async save(user: User): Promise<void> {
    await db.execute(
    `INSERT INTO users 
      (id_user, username, password_hash, role, name, city, address, street_number, company_logo) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user.id,
      user.username,
      user.passwordHash,
      user.role,
      user.name,
      user.city,
      user.address,
      user.streetNumber,
      user.companyLogo ?? null
    ]
    );
  }
  
  //Recupero di un utente tramite username
  async findByUsername(username: string): Promise<User | undefined> {
    const [rows]: any = await db.execute(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );

    if (rows.length === 0) 
      return undefined;

    const row = rows[0];
    return this.mapRowToUser(row);
  }

  //Recupero di un utente tramite ID
  async findById(userId: number): Promise<User | undefined> {
    const [rows]: any = await db.execute(
      `SELECT * FROM users WHERE id_user = ?`,
      [userId]
    );

    if (rows.length === 0) 
      return undefined;

    const row = rows[0];
    return this.mapRowToUser(row);
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
        address = ?, 
        street_number = ?, 
        company_logo = ?
      WHERE id_user = ?`,
      [
        user.username,
        user.passwordHash,
        user.role,
        user.name,
        user.city,
        user.address,
        user.streetNumber,
        user.companyLogo ?? null,
        user.id
      ]
    );
  }

  // Funzione di utilità per convertire una riga del DB in un oggetto User
  private mapRowToUser(row: any): User {
    return new User(
      row.id_user,
      row.username,
      row.password_hash,
      row.role,
      row.name,
      row.city,
      row.address,
      row.street_number,
      row.company_logo
    );
  }
}