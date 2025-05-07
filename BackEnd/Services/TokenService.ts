import { WalletBalance } from '../Models/WalletBalance';
import { WalletBalanceDAO } from '../DAO/WalletBalanceDAO';
import { web3, tokenContractABI, TOKEN_CONTRACT_ADDRESS, SYSTEM_WALLET_PRIVATE_KEY, SYSTEM_WALLET_PUBLIC_ADDRESS } from '../Utils/web3';

const walletBalanceDAO = new WalletBalanceDAO();

export async function issueTokens(userId: string, amount: number): Promise<WalletBalance> {
  try {
    const contract = new web3.eth.Contract(tokenContractABI, TOKEN_CONTRACT_ADDRESS);

    const tx = {
      from: SYSTEM_WALLET_PUBLIC_ADDRESS,
      to: TOKEN_CONTRACT_ADDRESS,
      gas: 200000,
      data: contract.methods.transfer(userId, web3.utils.toWei(amount.toString(), 'ether')).encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, SYSTEM_WALLET_PRIVATE_KEY);
    if (!signedTx.rawTransaction) throw new Error('Errore nella firma della transazione');

    await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    // SOLO dopo il successo della transazione aggiorniamo il DB
    let walletBalance = await walletBalanceDAO.findByUserId(userId);

    if (!walletBalance) {
      walletBalance = new WalletBalance(Math.floor(Math.random() * 1000000), userId, amount);
      await walletBalanceDAO.save(walletBalance);
    } 
    else {
      walletBalance.balance += amount;
      await walletBalanceDAO.update(walletBalance);
    }

    return walletBalance;
  } 
  catch (error: any) {
    throw new Error('Errore nell\'emissione sulla blockchain: ' + error.message);
  }
}

export async function getWalletBalance(userId: string): Promise<number> {
  const walletBalance = await walletBalanceDAO.findByUserId(userId);
  if (!walletBalance) throw new Error('Wallet non trovato');
  return walletBalance.balance;
}
