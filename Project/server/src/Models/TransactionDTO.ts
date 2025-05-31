export interface TransactionDTO {
    id: number;
    senderUserId: number;
    receiverUserId: number;
    senderWalletAddress: string;
    receiverWalletAddress: string;
    amount: number;
    transactionType: string;
    timestamp: Date;
}
