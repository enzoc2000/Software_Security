export interface UserProfile {
    id_user: number;
    role: string;
    name: string;
    city: string;
    address: string;
    wallet: {
        address: string;
        balance: number;
    };
}