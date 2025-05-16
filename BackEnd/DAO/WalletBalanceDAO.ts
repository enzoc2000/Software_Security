import { WalletBalance } from '../Models/WalletBalance';
import { db } from '../Config/db';

/**
 * DAO per la gestione dell'accesso ai dati del WalletBalance
 * Questa classe fornisce metodi per salvare, recuperare e aggiornare i saldi del portafoglio nel database.
 * Utilizza il modulo db per eseguire query SQL.
 */
export class WalletBalanceDAO {
    // Salvataggio di un WalletBalance
    async save(walletBalance: WalletBalance): Promise<void> {
        await db.execute(
            `INSERT INTO wallets (id_user, address, balance) VALUES (?, ?, ?)`,
            [
                walletBalance.userId,
                walletBalance.address,
                walletBalance.balance
            ]
        );
    }

    // Recupero del WalletBalance per un utente
    async findByUserId(userId: number): Promise<WalletBalance | undefined> {
        const [rows]: any = await db.execute(
            `SELECT * FROM wallets WHERE id_user = ?`,
            [userId]
        );

        if (rows.length === 0)
        return undefined;

        const row = rows[0];
        return this.mapRowToWalletBalance(row);
    }

    // Aggiornamento del saldo del WalletBalance per un utente
    async update(walletBalance: WalletBalance): Promise<void> {
        await db.execute(
            `UPDATE wallets SET address = ?, balance = ? WHERE id_user = ?`,
            [
                walletBalance.address,
                walletBalance.balance,
                walletBalance.userId
            ]
        );
    }

    // Funzione di utilità per convertire una riga del DB in un oggetto WalletBalance
    private mapRowToWalletBalance(row: any): WalletBalance {
        return new WalletBalance(
            row.id_user,
            row.balance,
            row.address
        );
    }
}