const bcrypt = require('bcryptjs');

/**
 * Utils per hashing e verifica delle password basato su bcryptjs
 */

//Funzione per hashare una password
export async function hashPassword(password: string): Promise<string> {
    //10 è il numero di round di hashing, più è alto più è sicuro ma più lento, 10 è un buon compromesso
    return bcrypt.hash(password, 10);
}

// Funzione per verificare una password hashata
// Confronta la password in chiaro con l'hash
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}