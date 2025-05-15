import Web3 from 'web3';

declare global {
  interface Window {
    ethereum?: any;
    web3?: Web3;
  }
}

export default async function connectToMetamask(): Promise<void> {
  if (window.ethereum) {
    await window.ethereum.enable();
    window.web3 = new Web3(window.ethereum);
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
}
import { ethers } from 'ethers';

async function connectWallet() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    //TODO lookup documentation for available method names
    await provider.send('eth_requestAccounts', []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return { provider, signer, address };
  } else {
    throw new Error('MetaMask is not installed');
  }
}
