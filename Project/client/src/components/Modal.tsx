import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UserDTO } from '../../../server/src/Models/UserDTO';
import { useNavigate } from 'react-router-dom';

const VITE_SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
async function sendCreditsApi(profileAddress: string, actorAddress: string, amount: number): Promise<boolean> {
  const res = await fetch(`http://localhost:${VITE_SERVER_PORT}/api/sendCredits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      profileAddress: profileAddress, 
      actorAddress: actorAddress, 
      amountOfCredits: amount 
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error("Send credits failed: " + err.error);
  }

  const data = await res.json();
  return data;
}

export function Modal({ credits, profile, onClose }: { credits: number, profile: UserDTO, onClose: () => void }) {
  const [dataActorsInDebt, setdataActorsInDebt] = useState<UserDTO | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAttore = sessionStorage.getItem("dataActorsInDebt");
    if (storedAttore) {
      setdataActorsInDebt(JSON.parse(storedAttore) as UserDTO);
    }
  }, []);


  if (!dataActorsInDebt) {
    return <div>No data found.</div>;
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowModal(true);
    //send token to another user
    try {
      console.log("Inizio invio crediti: ", credits);
      if (!profile.wallet_address || !dataActorsInDebt.wallet_address) {
        alert("Wallet address is missing for either the sender or the recipient.");
        setShowModal(false);
        return;
      }
      const result = await sendCreditsApi(profile.wallet_address, dataActorsInDebt.wallet_address, credits);
      if (!result) {
        alert("Send credits failed: insufficient balance");
        setShowModal(false);
        return;
      }
      else {
        setShowModal(false);
        alert(`Credits sent successfully: ${credits}`);
        sessionStorage.removeItem("dataActorsInDebt");
        onClose();
        navigate(-1);
      }
    }
    catch (error) {
      setShowModal(false);
      console.error("Error during credits transfer: ", error);
    }
  }

  return (
    <div className="fixed p-5 inset-0 bg-black/30 backdrop-blur-sm place-items-center-safe">
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
            <p>Sending credits...</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Modal;