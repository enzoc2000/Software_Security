import { Emission } from '../Models/Emission';
import { EmissionDAO } from '../DAO/EmissionDAO';
import { isValidCO2Amount } from '../Utils/validation';
import { RoleThresholdDAO } from '../DAO/RoleThresholdDAO';
import { UserDAO } from '../DAO/UserDAO';
import { issueTokens } from './TokenService';
import { EmissionDTO } from '../Models/EmissionDTO';

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
export async function submitEmission(userId: number, co2Amount: number): Promise<Emission> {
  if (!isValidCO2Amount(co2Amount)) {
    throw new Error('Valore di CO2 non valido');
  }

  const emission = new Emission(
    0,
    userId,
    co2Amount,
    new Date()
  );

  await emissionDAO.save(emission);

  const user = await userDAO.findById(userId);

  // Recupera soglia associata al ruolo dell'utente
  const userThreshold = await roleThresholdDAO.findThresholdByRole(user.role)

  if (!userThreshold) {
    throw new Error('Soglia non trovata per il ruolo dell\'utente');
  }

  if (userThreshold - emission.co2Amount >= 0) {
    //await issueTokens(userId, userThreshold - emission.co2Amount);
    console.log(`Carbon credit assegnati (+${userThreshold - emission.co2Amount} tCO₂)`);
  } else {
    //await removeTokens(userId, Math.abs(userThreshold - emission.co2Amount)); //Il metotdo removeTokens deve essere implementato in TokenService.ts
    console.log(`Carbon credit rimossi (-${Math.abs(userThreshold - emission.co2Amount)} tCO₂)`);
  }
  return emission;
}

/**
 * Restituisce le emissioni registrate da un utente.
 */
export async function getEmissionsByUser(userId: number): Promise<EmissionDTO[]> {
  const emissions = await emissionDAO.findByUserId(userId);
  const emissionsDTO: EmissionDTO[] = emissions.map(emission => ({
    id_emission: emission.id,
    co2_amount: emission.co2Amount,
    date: emission.timestamp
  }));
  return emissionsDTO;
}