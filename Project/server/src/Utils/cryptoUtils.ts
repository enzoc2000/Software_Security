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




async function main() {
 const codiceHashato1 = await hashPassword('J5Q2N8X1R4Z6');
 const codiceHashato2 = await hashPassword('V7K3F9L2M8Y1');
 const codiceHashato3 = await hashPassword('B4D6X1P9Q3W8');
 const codiceHashato4 = await hashPassword('C2H5T8L7M1Q9');
 const codiceHashato5 = await hashPassword('R6F3K9X2B4Y1');
//console.log(codiceHashato1);

}

main();