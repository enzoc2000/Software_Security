import { Emission } from '../Models/Emission';
import { EmissionDAO } from '../DAO/EmissionDAO';
import { isValidCO2Amount } from '../Utils/validation';
import { RoleThresholdDAO } from '../DAO/RoleThresholdDAO';
import { UserDAO } from '../DAO/UserDAO';
import { removeCarbonCredits, mintCarbonCredits } from './TokenService';
import { EmissionDTO } from '../Models/EmissionDTO';
import { User } from '../Models/User';
import { UserLatestEmissionDTO } from '../Models/UserLatestEmissionDTO';
import { BurnRequestDTO } from '../Models/BurnRequestDTO';

/**
 * Servizio per la gestione delle emissioni.
 * Usa un'istanza di EmissionDAO.
 */
const emissionDAO = new EmissionDAO();
const roleThresholdDAO = new RoleThresholdDAO();
const userDAO = new UserDAO();


/**
 * Valida ed elabora i dati di emissione CO2.
 * Se validi, li salva e li restituisce per il servizio token.
 */
export async function submitEmission(userId: number, co2Amount: number): Promise<Emission | BurnRequestDTO> {

  let request: BurnRequestDTO = {
    requiresBurn: false,
    userId: userId,
    carbonCredits: 0,
    remainingDebt: 0,
    emissionAmount: 0
  };

  if (!isValidCO2Amount(co2Amount)) {
    throw new Error('Valore di CO2 non valido');
  }

  const user = await userDAO.findById(userId);

  // Recupera soglia associata al ruolo dell'utente
  const userThreshold = await roleThresholdDAO.findThresholdByRole(user.role)

  if (!userThreshold) {
    throw new Error('Soglia non trovata per il ruolo dell\'utente');
  }

  if (userThreshold - co2Amount >= 0 && user.wallet) {
    const carbonCredit = await mintCarbonCredits(user.id, user.wallet?.address, userThreshold - co2Amount);
    console.log(`Carbon credit assegnati (+${userThreshold - co2Amount} tCO₂)`);

    const emission = new Emission(
      0,
      userId,
      co2Amount,
      new Date(),
      carbonCredit // Carbon credits associati all'emissione
   );

    await emissionDAO.save(emission);

    return emission;
  } 
  else {
    if (user.wallet) {
      request = await removeCarbonCredits(userId, user.wallet.address, Math.abs(userThreshold - co2Amount), co2Amount);
    }
    return request
  }
}

/**
 * Restituisce le emissioni registrate da un utente.
 */
/* export async function getEmissionsByUser(userId: number): Promise<EmissionDTO[]> {
  const emissions = await emissionDAO.findByUserId(userId);
  if (emissions.length === 0) {
    return [];
  }
  const emissionsDTO: EmissionDTO[] = emissions.map(emission => ({
    id_emission: emission.id,
    co2_amount: emission.co2Amount,
    date: emission.timestamp
  }));
  return emissionsDTO;
} */

/**
 * Restituisce le emissioni registrate da un utente e il treshold dell'utente
 */
export async function getEmissionsAndTresholdByUser(userId: number): Promise<EmissionDTO[]> {
  const emissions = await emissionDAO.findByUserId(userId);
  if (emissions.length === 0) {
    return [];
  }
  //console.log(emissions);
  const user = await userDAO.findById(userId)
  
  const treshold = await roleThresholdDAO.findThresholdByRole(user.role);
  
  const emissionsDTO: EmissionDTO[] = emissions.map(emission => ({
    id_emission: emission.id,
    co2_amount: emission.co2Amount,
    treshold: treshold,
    date: emission.timestamp,
    carbonCredits: emission.carbonCredits
  }));
  //console.log(emissionsDTO);
  return emissionsDTO;
}

export async function getLatestEmissions(): Promise<UserLatestEmissionDTO[]> {
  const latestEmissions: {id_emission: number, id_user: number, timestamp: Date, co2_amount: number }[] =
    await emissionDAO.findLatest();

  if (latestEmissions.length === 0) {
    return [];
  }

  const emissions = await Promise.all(
    latestEmissions.map(
      async userEmission => {
        const { name, role } = await userDAO.findNameRoleById(userEmission.id_user);
        const treshold = await roleThresholdDAO.findThresholdByRole(role);
        return { id_emission: userEmission.id_emission, actor_name: name,actor_role: role, co2_amount: userEmission.co2_amount, date: userEmission.timestamp, treshold: treshold };
      })
    );

  return emissions;
}