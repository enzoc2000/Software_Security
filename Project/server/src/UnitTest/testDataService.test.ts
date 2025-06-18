import { User } from '../Models/User';
import { submitEmission, getEmissionsAndTresholdByUser, getLatestEmissions } from '../Services/DataService';
import { UserDAO } from '../DAO/UserDAO';
import { seedUsers } from '../Data/seedUsers';
import { UserWallet } from '../Models/UserWallet';
import { UserWalletDAO } from '../DAO/UserWalletDAO';
import { DebtsDAO } from '../DAO/DebtsDAO';

// Piccolo test per verificare il funzionamento dei servizi di emissione
async function main() {
  try {
    //Inserimento di un utente di test
    const user = new User(0, seedUsers[0].username, seedUsers[0].password, seedUsers[0].email, seedUsers[0].role, seedUsers[0].name, seedUsers[0].city, seedUsers[0].address);
    const userDAO = new UserDAO();
    user.id = await userDAO.save(user);
    const debtsDAO = new DebtsDAO();
    debtsDAO.save(user.id, 0);
    console.log('Utente di test creato con ID:', user.id);
    const userWallet = new UserWallet(user.id, 0, seedUsers[0].walletAddress);
    const userWalletDAO = new UserWalletDAO();
    userWalletDAO.save(userWallet);
    console.log('Wallet utente di test creato');
    
    //Registrazione di un'emissione di CO2
    const emission = await submitEmission(user.id, 80);
    console.log('Dati emissione registrati:', emission);

    // Recupero delle emissioni e soglia per l'utente
    const emissionsWithThreshold = await getEmissionsAndTresholdByUser(user.id);
    console.log('Emissioni con soglia:', emissionsWithThreshold);

    // Recupero delle ultime emissioni
    const latestEmissions = await getLatestEmissions();
    console.log('Ultime emissioni:', latestEmissions);

   // const userEmissions = await getEmissionsByUser(1);
   // console.log('Storico emissioni:', userEmissions);
  } catch (error) {
    console.error('Errore:', (error as Error).message);
  }
}

main();