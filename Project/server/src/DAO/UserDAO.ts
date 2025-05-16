import { User } from '../Models/User';

/**
 * DAO per la gestione dell'accesso ai dati utente
 * Attualmente usa una mappa in-memory
 * Questa sarà sostituita dalla connessione al database e nella logica delle varie funzioni
 * verranno poi inserite le query
 * Le funzioni sono asincrone per averle pronte per l'uso con il database
 */
export class UserDAO {

    //Map che simula temporaneamente il database
    private users: Map<number, User>;
  
    constructor() {
      this.users = new Map<number, User>();
    }
  
    //Salvataggio di un utente 
    async save(user: User): Promise<void> {
      this.users.set(user.id, user);
    }
  
    //Recupero di un utente tramite username
    async findByUsername(username: string): Promise<User | undefined> {
      for (const user of this.users.values()) {
        if (user.username === username) {
          return user;
        }
      }
      return undefined;
    }
  
    //Recupero di un utente tramite ID
    async findById(userId: number): Promise<User | undefined> {
      return this.users.get(userId);
    }
  
    //Aggiornamento di un utente
    async update(user: User): Promise<void> {
      this.users.set(user.id, user);
    }
  }