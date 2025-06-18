import { signUpUser, loginUser, linkWallet } from '../Services/UserService';
import { seedUsers, seedSerialCodes} from '../Data/seedUsers';
import { UserWallet } from '../Models/UserWallet';

// Piccolo test per verificare il funzionamento dei servizi utente
async function main() {
  // Registrazione del primo utente di seedUsers
  await signUpUser(seedUsers[0].username,
                  seedUsers[0].password,
                  seedUsers[0].address,
                  seedUsers[0].role,
                  seedUsers[0].name,
                  seedUsers[0].city,
                  seedUsers[0].address,
                  seedUsers[0].walletAddress,
                  seedSerialCodes[0].serial_code);
  
  // Registrazione del secondo utente di seedUsers
  await signUpUser(seedUsers[1].username,
                  seedUsers[1].password,
                  seedUsers[1].address,
                  seedUsers[1].role,
                  seedUsers[1].name,
                  seedUsers[1].city,
                  seedUsers[1].address,
                  seedUsers[1].walletAddress,
                  seedSerialCodes[1].serial_code);
                  
  console.log('Utenti di seedUsers registrati con successo.');

  // Esempio di login
  try {
    const user = await loginUser('aziendaAgricola', 'Password123', '0x829CB82CCa7C9471aB05c668031f34E67C2dfFeb');
    console.log('Login effettuato:', user);
  } catch (error) {
    console.error('Errore:', (error as Error).message);
  }
}

main();