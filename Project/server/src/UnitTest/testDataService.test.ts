import { submitEmission, getEmissionsByUser } from '../Services/DataService';

// Piccolo test per verificare il funzionamento dei servizi di emissione
async function main() {
  try {
    const emission = await submitEmission(1, 500);
    console.log('Dati emissione registrati:', emission);

    const userEmissions = await getEmissionsByUser(1);
    console.log('Storico emissioni:', userEmissions);
  } catch (error) {
    console.error('Errore:', (error as Error).message);
  }
}

main();