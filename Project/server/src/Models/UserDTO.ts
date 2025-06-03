export interface UserDTO {
  id: number;
  email: string;
  role: string;
  name: string;
  city: string;
  address: string;
  wallet_address?: string;
  wallet_balance?: number;
}