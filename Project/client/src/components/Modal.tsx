import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UserDTO } from '../Models/UserDTO';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ethers } from 'ethers';
import { BurnRequestDTO } from '../Models/BurnRequestDTO';
import { UserDebtDTO } from '../Models/UserDebtDTO';

const VITE_SERVER_PORT = import.meta.env.VITE_SERVER_PORT ?? 3010; // Default port if not set

async function removeCarbonCreditsApi(profileId: number, profileAddress: string, actorDebt: number, co2Amount: number, credits: number, token: string): Promise<BurnRequestDTO> {
  const response = await fetch(`http://localhost:${VITE_SERVER_PORT}/api/removeCarbonCredits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      profileId: profileId,
      profileAddress: profileAddress,
      actorDebt: actorDebt,
      co2Amount: co2Amount,
      credits: credits
    }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error("Remove carbon credits failed: " + err.error);
  }
  const res = await response.json();
  return res;
}

async function submitBurnApi(response: BurnRequestDTO, tx: ethers.TransactionResponse, token: string) {
  const res = await fetch(`http://localhost:${VITE_SERVER_PORT}/api/submitBurn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      requiresBurn: response.requiresBurn,
      userId: response.userId,
      carbonCredits: response.carbonCredits,
      remainingDebt: response.remainingDebt,
      emissionAmount: response.emissionAmount,
      isDonation: response.isDonation,
      idRecipient: response.idRecipient,
      tx: {
        hash: tx.hash,
        contractAddress: response.tx?.contractAddress ?? "",
        from: response.tx?.from ?? "",
        data: response.tx?.data ?? "",
      }
    })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error("Submit burn failed: " + err.error);
  }
  await res.json();
}

export function Modal({ credits, profile, onClose }: { credits: number, profile: UserDTO, onClose: () => void }) {
  const [dataActorsInDebt, setdataActorsInDebt] = useState<UserDebtDTO | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { token } = useAuth();
  const [loadingMessage, setLoadingMessage] = useState("Sending credits...");
  const navigate = useNavigate();

  useEffect(() => {
    const storedAttore = sessionStorage.getItem("dataActorInDebt");
    if (storedAttore) {
      setdataActorsInDebt(JSON.parse(storedAttore) as UserDebtDTO);
    }
  }, []);

  if (!token) {
    return <div>Loading token...</div>;
  }

  if (!dataActorsInDebt) {
    return <div>No data actor found.</div>;
  }
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    //burn token to send credits to another user
    try {
      if (!profile.wallet_address || !dataActorsInDebt.wallet_address) {
        alert("Wallet address is missing for either the sender or the recipient.");
        setShowModal(false);
        return;
      }
      if (!profile.wallet_balance || profile.wallet_balance <= 0) {
        alert("Insufficient balance.");
        setShowModal(false);
        return;
      }
      setLoadingMessage("Sending credits...");
      setShowModal(true);
      const response = await removeCarbonCreditsApi(profile.id, profile.wallet_address, dataActorsInDebt.debt, 0, credits, token);
      console.log(response);

      if (!response) {
        setShowModal(false);
        alert("Sending credits failed.");
        return;
      }

      // 🔥 Caso in cui serve burn → firma transazione dal frontend
      setLoadingMessage("Waiting for wallet signature...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: response.tx!.contractAddress,
        from: response.tx!.from,
        data: response.tx!.data,
        value: "0x0"
      });

      response.idRecipient = dataActorsInDebt.id;
      response.isDonation = true;

      setLoadingMessage("Waiting for blockchain confirmation...");
      await tx.wait();

      // ✅ Invia conferma di transazione al backend
      setLoadingMessage("Confirming transaction with backend...");
      await submitBurnApi(response, tx, token);

      alert(`Credits sent successfully: ${credits}`);
      sessionStorage.removeItem("dataActorInDebt");
      onClose();
      navigate(-1);
    }
    catch (error) {
      setShowModal(false);
      console.error("Error during credits transfer: ", error);
    }
  }

  return (
    <div className='flex flex-wrap w-1/2 h-screen items-center justify-center'>
      <div className='mt-10 gap-5'>
        <button className='place-self-end' onClick={onClose}>
          <X size={30} />
        </button>
        <div className='grid gap-5 border-2 bg-white rounded-lg p-5 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800'>
          <h1 className="text-5xl">Are you sure you want to send {credits} credits
            to {dataActorsInDebt.name} ?
          </h1>
          <button
            className="border-2 px-4 py-2 rounded-lg border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800"
            disabled={showModal}
            onClick={onClose}>No
          </button>
          <button
            className="border-2 px-4 py-2 rounded-lg border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800"
            name='submit'
            disabled={showModal}
            onClick={(e) => handleSubmit(e)}>Yes
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed p-5 inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-4 border-2 rounded-lg text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
            <p>{loadingMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Modal;