import { WalletBalance } from '../Models/WalletBalance';

// Mappa che simula un database in memoria
const WalletBalances: Map<string, WalletBalance> = new Map();

export class WalletBalanceDAO {
    // Salvataggio di un WalletBalance
    async save(WalletBalance: WalletBalance): Promise<void> {
        WalletBalances.set(WalletBalance.userId, WalletBalance);
    }

    // Recupero del WalletBalance per un utente
    async findByUserId(userId: string): Promise<WalletBalance | undefined> {
        return WalletBalances.get(userId);
    }

    // Aggiornamento del saldo del WalletBalance per un utente
    async update(WalletBalance: WalletBalance): Promise<void> {
        WalletBalances.set(WalletBalance.userId, WalletBalance);
    }
}