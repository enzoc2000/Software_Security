import { UserWallet } from '../Models/UserWallet';
import { db } from '../Config/db';

/**
 * DAO per la gestione dell'accesso ai dati del Wallet
 * Questa classe fornisce metodi per salvare, recuperare e aggiornare i dati del portafoglio nel database.
 * Utilizza il modulo db per eseguire query SQL.
 */
export class UserWalletDAO {
    // Salvataggio di un Wallet
    async save(walletBalance: UserWallet): Promise<void> {
        await db.execute(
            `INSERT INTO wallets (id_user, address, balance) VALUES (?, ?, ?)`,
            [
                walletBalance.userId,
                walletBalance.address,
                walletBalance.balance
            ]
        );
    }

    // Recupero del Wallet per un utente
    async findByUserId(userId: number): Promise<UserWallet | undefined> {
        const [rows]: any = await db.execute(
            `SELECT * FROM wallets WHERE id_user = ?`,
            [userId]
        );

        if (rows.length === 0)
            return undefined;

        const row = rows[0];
        return this.mapRowToWalletBalance(row);
    }

    // Recupero del Wallet sulla base dell'indirizzo
    async findByAddress(address: string): Promise<UserWallet | undefined> {
        const [rows]: any = await db.execute(
            `SELECT * FROM wallets WHERE address = ?`,
            [address]
        );

        if (rows.length === 0)
            return undefined;

        const row = rows[0];
        return this.mapRowToWalletBalance(row);
    }

    // Aggiornamento del saldo del WalletBalance per un utente
    async update(walletBalance: UserWallet): Promise<void> {
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
    private mapRowToWalletBalance(row: any): UserWallet {
        return new UserWallet(
            row.id_user,
            row.balance,
            row.address
        );
    }
}