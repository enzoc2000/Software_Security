import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UserDTO } from '../../../server/src/Models/UserDTO';
import { useNavigate } from 'react-router-dom';

const VITE_SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
async function sendCreditsApi(profileId: number, actorId: number, amount: number): Promise<boolean> {
  const res = await fetch(`http://localhost:${VITE_SERVER_PORT}/api/sendCredits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ profileId, actorId, amount }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error("Send credits failed: " + err.error);
  }

  const data = await res.json();
  return data;
}

export function Modal({ credits, profile, onClose }: { credits: number, profile: UserDTO, onClose: () => void }) {
  const [datiAttore, setDatiAttore] = useState<UserDTO | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedAttore = sessionStorage.getItem("datiAttore");
    if (storedAttore) {
      setDatiAttore(JSON.parse(storedAttore) as UserDTO);
    }
  }, []);


  if (!datiAttore) {
    return <div>No data found.</div>;
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    //send token to another user
    try {
      console.log("Inizio invio crediti: ", credits);
      /* const result = await sendCreditsApi(profile.id, datiAttore.id, credits);
      if (!result) {
        alert("Send credits failed: insufficient balance");
        return;
      } */
      alert(`Credits sent successfully: ${credits}`);
      sessionStorage.removeItem("datiAttore");
      onClose();
      navigate(-1);
    } 
    catch (error) {
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
            to {datiAttore.name} ?
          </h1>
          <button
            className="border-2 px-4 py-2 rounded-lg border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800"
            onClick={onClose}>No
          </button>
          <button
            className="border-2 px-4 py-2 rounded-lg border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800"
            onClick={(e) => handleSubmit(e)}>Yes
          </button>

        </div>
      </div>
    </div>
  );
}
export default Modal;