import { ethers } from 'ethers';

function verifySignature(address: string, signature: string, nonce: string): boolean {
  const recoveredAddress = ethers.utils.verifyMessage(`Sign this nonce: ${nonce}`, signature);
  return recoveredAddress.toLowerCase() === address.toLowerCase();
}
