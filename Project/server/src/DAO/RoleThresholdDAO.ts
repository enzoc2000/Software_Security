import { db } from '../Config/db';

export class RoleThresholdDAO {

    // Salvataggio di un ruolo e della sua soglia
    async save(role: string, threshold: number): Promise<void> {
        await db.execute(
        `INSERT INTO role_thresholds (role, threshold) VALUES (?, ?)`,
        [
            role,
            threshold
        ]
        );
    }
    
    // Recupero di tutti i ruoli e le loro soglie
    async findAll(): Promise<{ role: string; threshold: number }[]> {
        const [rows]: any = await db.execute(
            `SELECT role, threshold FROM role_thresholds`
        );

        if (rows.length === 0) 
            throw new Error('Nessun ruolo trovato');

        return rows.map((row: any) => ({
            role: row.role,
            threshold: row.threshold
        }));
    }

    // Recupero della soglia per un ruolo specifico
    async findThresholdByRole(role: string): Promise<number> {
        const [rows]: any = await db.execute(
        `SELECT threshold FROM role_thresholds WHERE role = ?`,
        [role]
        );
    
        if (rows.length === 0) 
        throw new Error(`Soglia non trovata`);
    
        return rows[0].threshold;
    }
    
    // Aggiornamento della soglia per un ruolo specifico
    async updateThreshold(role: string, threshold: number): Promise<void> {
        await db.execute(
        `UPDATE role_thresholds SET threshold = ? WHERE role = ?`,
        [threshold, role]
        );
    }


}