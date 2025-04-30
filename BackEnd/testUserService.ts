import { initializeUsers, loginUser, linkWallet } from './Services/UserService';

// Piccolo test per verificare il funzionamento dei servizi utente
async function main() {
  // Inizializza utenti preregistrati
  await initializeUsers();

  // Esempio di login
  try {
    const user = await loginUser('azienda_agricola', 'password123');
    console.log('Login effettuato:', user);

    // Esempio di associazione wallet
    const updatedUser = await linkWallet(user.id, '0x1234567890abcdef');
    console.log('Wallet associato:', updatedUser);
  } catch (error) {
    console.error('Errore:', (error as Error).message);
  }
}

main();