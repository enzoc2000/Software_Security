import { signUpUser, loginUser, linkWallet } from './Services/UserService';
import { seedUsers } from './Data/seedUsers';
import { UserWallet } from './Models/UserWallet';

// Piccolo test per verificare il funzionamento dei servizi utente
async function main() {
  // Registrazione del primo utente di seedUsers
  await signUpUser(seedUsers[0].username,
                  seedUsers[0].password,
                  seedUsers[0].role,
                  seedUsers[0].name,
                  seedUsers[0].city,
                  seedUsers[0].address,
                  seedUsers[0].streetNumber,
                  seedUsers[0].companyLogo);
  
  // Registrazione del secondo utente di seedUsers
  await signUpUser(seedUsers[1].username,
                  seedUsers[1].password,
                  seedUsers[1].role,
                  seedUsers[1].name,
                  seedUsers[1].city,
                  seedUsers[1].address,
                  seedUsers[1].streetNumber,
                  seedUsers[1].companyLogo);
                  
  // Registrazione del terzo utente di seedUsers
  await signUpUser(seedUsers[2].username,
                  seedUsers[2].password,
                  seedUsers[2].role,
                  seedUsers[2].name,
                  seedUsers[2].city,
                  seedUsers[2].address,
                  seedUsers[2].streetNumber,
                  seedUsers[2].companyLogo);

  // Esempio di associazione wallet
  // Associa un wallet all'utente con ID 1
  const updatedUser = await linkWallet(1, new UserWallet(1, 0, '0x1234567890abcdef1234567890abcdef12345678'));
  console.log('Wallet associato:', updatedUser);

  // Esempio di login
  try {
    const user = await loginUser('azienda_agricola', 'password123', '0x1234567890abcdef1234567890abcdef12345678');
    console.log('Login effettuato:', user);
  } catch (error) {
    console.error('Errore:', (error as Error).message);
  }
}

main();