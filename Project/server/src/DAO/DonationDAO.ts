import { Donation } from '../Models/Donation';
import { db } from '../Config/db';

export class DonationDAO {

    // Salvataggio di una transazione
    async save(transaction: Donation): Promise<void> {
        await db.execute(
            `INSERT INTO transactions (sender_user_id, receiver_user_id, sender_wallet_address, receiver_wallet_address, amount, timestamp) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                transaction.senderUserId,
                transaction.receiverUserId,
                transaction.senderWalletAddress,
                transaction.receiverWalletAddress,
                transaction.amount,
                transaction.timestamp
            ]
        );
    }

    // Recupero di tutte le transazioni
    async findAll(): Promise<Donation[]> {
        const [rows]: any = await db.execute(
            `SELECT * FROM transactions`
        );

        if (rows.length === 0)
            return [];

        return rows.map(this.mapRowToDonation);
    }

     // Funzione di utilità per convertire una riga del DB in un oggetto Transaction
    private mapRowToDonation(row: any): Donation {
        return new Donation(
            row.id,
            row.sender_user_id,
            row.receiver_user_id,
            row.sender_wallet_address,
            row.receiver_wallet_address,
            row.amount,
            new Date(row.timestamp)
        );
    }
}