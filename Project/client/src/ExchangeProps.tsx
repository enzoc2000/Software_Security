import React, { useState, useEffect, ChangeEvent } from "react";

// Extend the Window interface to include the ethereum property
declare global {
  interface Window {
    ethereum?: any;
  }
}

import { ethers } from "ethers";
import CarbonCredit from "../../hardhat/artifacts/contracts/CarbonCredit.sol/CarbonCredit.json";

interface ExchangeProps {}

const CONTRACT_ADDRESSES: Record<string, string> = {
  "0x1": "0xYourMainnetAddress",
  "0x4": "0xYourRinkebyAddress",
  "0x539": "0xYourLocalHardhatAddress" // Example chain ID for Hardhat local network
};

const Exchange: React.FC<ExchangeProps> = () => {
  const [account, setAccount] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    async function connectWallet() {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        setAccount(userAddress);

        // Get chainId from MetaMask and lookup the corresponding contract address
        const chainId = await provider.send("eth_chainId", []);
        const contractAddress = CONTRACT_ADDRESSES[chainId];
        if (!contractAddress) {
          alert("Unsupported network for CarbonCredit token.");
          return;
        }
        setContract(new ethers.Contract(contractAddress, CarbonCredit.abi, signer));
      }
    }
    connectWallet();
  }, []);

  const handleTransfer = async (): Promise<void> => {
    if (!recipient || !amount || !contract) return;
    try {
      const tx = await contract.transfer(recipient, ethers.parseUnits(amount, 18));
      await tx.wait();
      alert("Transfer successful!");
    } catch (error) {
      console.error(error);
      alert("Transfer failed!");
    }
  };

  return (
    <div>
      <h2>Exchange Tokens</h2>
      <p>Connected wallet: {account}</p>
      <input
        type="text"
        placeholder="Recipient address"
        value={recipient}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transfer Tokens</button>
    </div>
  );
};

export default Exchange;