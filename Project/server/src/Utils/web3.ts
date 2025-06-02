// import Web3 from 'web3';
// import dotenv from 'dotenv';
// import { AbiItem } from 'web3-utils';

// dotenv.config();

// export const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER_URL!));

// // Chiave privata e pubblica del wallet di sistema
// export const SYSTEM_WALLET_PRIVATE_KEY = process.env.SYSTEM_WALLET_PRIVATE_KEY!;
// export const SYSTEM_WALLET_PUBLIC_ADDRESS = process.env.SYSTEM_WALLET_PUBLIC_ADDRESS!;

// // Indirizzo del contratto
// export const TOKEN_CONTRACT_ADDRESS = process.env.TOKEN_CONTRACT_ADDRESS!;

// // ABI di esempio (standard ERC-20)
// export const tokenContractABI: AbiItem[] = [
//   {
//     constant: false,
//     inputs: [
//       { name: "_to", type: "address" },
//       { name: "_value", type: "uint256" }
//     ],
//     name: "transfer",
//     outputs: [{ name: "", type: "bool" }],
//     type: "function"
//   },
//   {
//     constant: true,
//     inputs: [{ name: "_owner", type: "address" }],
//     name: "balanceOf",
//     outputs: [{ name: "balance", type: "uint256" }],
//     type: "function"
//   }
// ];
