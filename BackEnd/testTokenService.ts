import { issueTokens, getWalletBalance } from './Services/TokenService';

async function main() {
  try {
    const userId = '0x123abc...'; // Wallet dell'utente
    const token = await issueTokens(userId, 50);
    console.log('Token emessi:', token);

    const saldo = await getWalletBalance(userId);
    console.log('Saldo token:', saldo);
  } catch (err: any) {
    console.error('Errore:', err.message);
  }
}

main();
