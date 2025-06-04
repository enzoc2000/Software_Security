export interface BurnRequestDTO { 
    requiresBurn: boolean;
    userId: number;
    carbonCredits: number;
    tx?: {
        hash?: string,
        contractAddress: string,
        from: string,
        data: string
    };
    isDonation: boolean;
    idRecipient?: number;
    remainingDebt: number;
    emissionAmount?: number
}