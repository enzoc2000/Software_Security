import { Emission } from '../Models/Emission';

// Map che simula temporaneamente il database
const emissions: Map<number, Emission> = new Map();

export class EmissionDAO {
    // Salvataggio di un'emissione
    async save(emission: Emission): Promise<void> {
        emissions.set(emission.id, emission);
    }

    // Recupero di tutte le emissioni
    async findAll(): Promise<Emission[]> {
        return Array.from(emissions.values());
    }

    // Recupero di un'emissione tramite ID dell'utente
    async findByUserId(userId: number): Promise<Emission[]> {
        return Array.from(emissions.values()).filter(e => e.userId === userId);
    }
}