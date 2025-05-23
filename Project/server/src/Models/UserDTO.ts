export interface UserDTO {
  id: number;
  role: string;
  name: string;
  city: string;
  address: string;
  wallet_address?: string;
  wallet_balance?: number;
}