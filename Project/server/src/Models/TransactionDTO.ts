export interface TransactionDTO {
    id: number;
    senderName: string;
    senderRole: string;
    receiverName: string;
    receiverRole: string;
    amount: number;
    timestamp: Date;
}