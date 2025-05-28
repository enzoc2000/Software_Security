import { db } from '../Config/db';

export class DebtsDAO {

    // Salvataggio di un debito per un utente
    async save(userId: number, debt: number): Promise<void> {
        await db.execute(
            `INSERT INTO debts (id_user, debt) VALUES (?, ?)`,
            [userId, debt]
        );
    }


    // Recupero di tutti i debiti
    async findAll(): Promise<any[]> {
        const [rows]: any = await db.execute(
            `SELECT * FROM debts`
        );

        return rows;
    }


    // Recupero di un debito per un utente
    async findByUserId(userId: number): Promise<number> {
        const [rows]: any = await db.execute(
            `SELECT debt FROM debts WHERE id_user = ?`,
            [userId]
        );

        if (rows.length === 0) 
            throw new Error('Debito non trovato');

        return rows[0].debt;
    }


    // Aggiornamento di un debito per un utente
    async update(userId: number, debt: number): Promise<void> {
        const [rows]: any = await db.execute(
            `UPDATE debts SET debt = ? WHERE id_user = ?`,
            [debt, userId]
        );

        if (rows.affectedRows === 0) 
            throw new Error('Debito non trovato o non aggiornato');
    }
}