import { Transaction } from '../Models/Transaction';
import { db } from '../Config/db';

export class TransactionDAO {

    // Salvataggio di una transazione
    async save(transaction: {
        senderUserId: number;
        receiverUserId: number;
        senderWalletAddress: string;
        receiverWalletAddress: string;
        amount: number;
        transactionType: string;
        timestamp: Date;
    }): Promise<void> {
        await db.execute(
            `INSERT INTO transactions (sender_user_id, receiver_user_id, sender_wallet_address, receiver_wallet_address, amount, transaction_type, timestamp) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                transaction.senderUserId,
                transaction.receiverUserId,
                transaction.senderWalletAddress,
                transaction.receiverWalletAddress,
                transaction.amount,
                transaction.transactionType,
                transaction.timestamp
            ]
        );
    }

    // Recupero di tutte le transazioni
    async findAll(): Promise<Transaction[]> {
        const [rows]: any = await db.execute(
            `SELECT * FROM transactions`
        );

        if (rows.length === 0)
            throw new Error('Transazione non trovata');

        return rows.map(this.mapRowToTransaction);
    }

     // Funzione di utilità per convertire una riga del DB in un oggetto Transaction
    private mapRowToTransaction(row: any): Transaction {
        return new Transaction(
            row.id,
            row.sender_user_id,
            row.receiver_user_id,
            row.sender_wallet_address,
            row.receiver_wallet_address,
            row.amount,
            row.transaction_type,
            new Date(row.timestamp)
        );
    }

}
