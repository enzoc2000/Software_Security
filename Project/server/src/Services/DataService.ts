import { Emission } from '../Models/Emission';
import { EmissionDAO } from '../DAO/EmissionDAO';
import { isValidCO2Amount } from '../Utils/validation';

/**
 * Servizio per la gestione delle emissioni.
 * Usa un'istanza di EmissionDAO.
 */
const emissionDAO = new EmissionDAO();

/**
 * Valida ed elabora i dati di emissione CO2.
 * Se validi, li salva e li restituisce per il servizio token.
 */
export async function submitEmission(userId: number, co2Amount: number): Promise<Emission> {
  if (!isValidCO2Amount(co2Amount)) {
    throw new Error('Valore di CO2 non valido');
  }

  const emission = new Emission(
    Math.floor(Math.random() * 1000000), // ID casuale tra 0 e 999999
    userId,
    co2Amount,
    new Date()
  );

  await emissionDAO.save(emission);
  return emission;
}

/**
 * Restituisce le emissioni registrate da un utente.
 */
export async function getEmissionsByUser(userId: number): Promise<Emission[]> {
  return await emissionDAO.findByUserId(userId);
}