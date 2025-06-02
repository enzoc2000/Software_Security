import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default async function connectWallet() {
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
  