import { Emission } from '../Models/Emission';
import { db } from '../Config/db';

/**
 * DAO per la gestione dell'accesso ai dati delle emissioni
 * Questa classe fornisce metodi per salvare, recuperare e aggiornare le emissioni nel database.
 * Utilizza il modulo db per eseguire query SQL.
 */
export class EmissionDAO {
    // Salvataggio di un'emissione
    async save(emission: Emission): Promise<void> {
        await db.execute(
            `INSERT INTO emissions (id_emission, co2_amount, timestamp, id_user, carbon_credits)
            VALUES (?, ?, ?, ?)
            `,
            [
                emission.id,
                emission.co2Amount,
                emission.timestamp,
                emission.userId,
                emission.carbonCredits
            ]
        );
    }

    // Recupero di tutte le emissioni
    async findAll(): Promise<Emission[]> {
        const [rows]: any = await db.execute(
            `SELECT * FROM emissions`
        );

        if (rows.length === 0)
            throw new Error('Emissione non trovata');

        return rows.map(this.mapRowToEmission);
    }

    // Recupero di un'emissione tramite ID dell'utente
    async findByUserId(userId: number): Promise<Emission[]> {
        const [rows]: any = await db.execute(
            `SELECT * FROM emissions WHERE id_user = ?`,
            [userId]
        );

        if (rows.length === 0)
            return [];
        
        return rows.map(this.mapRowToEmission);
    }

    // Recupero dell'emissione più recente per ogni utente
    async findLatest(): Promise<{id_emission: number, id_user: number, timestamp: Date, co2_amount: number, carbon_credits: number }[]> {
        const [rows]: any = await db.execute(
            `SELECT e.* FROM emissions e
                INNER JOIN (
                    -- per ogni user prendo il timestamp massimo
                    SELECT id_user, MAX(\`timestamp\`) AS max_ts
                    FROM emissions
                    GROUP BY id_user
                ) latest ON e.id_user = latest.id_user
                        AND e.\`timestamp\` = latest.max_ts;`
        );

        return rows;
    }

    // Funzione di utilità per convertire una riga del DB in un oggetto Emission
    private mapRowToEmission(row: any): Emission {
        return new Emission(
            row.id_emission,
            row.id_user,
            row.co2_amount,
            new Date(row.timestamp),
            row.carbon_credits
        );
    }
}