import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { useVerifyAuth } from "../hooks/useVerifyAuth";
import { UserDTO } from "../../../server/src/Models/UserDTO";
import { Modal } from "./Modal";

export function ExchangePage() {
  const { profile } = useVerifyAuth();
  const navigate = useNavigate();

  const [datiAttore, setDatiAttore] = useState<UserDTO | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  
  useEffect(() => {
    const storedAttore = sessionStorage.getItem("datiAttore");
  
    if (storedAttore) {
      setDatiAttore(JSON.parse(storedAttore) as UserDTO);
    }

  }, [profile]);

  if (!profile) {
    return <div>Loading profile…</div>;
  }

  if (!datiAttore) {
    return <div>No data found.</div>;
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if ((profile.wallet_balance ?? 0) < credits) {
      alert("Send credits failed: insufficient balance");
      return
    }
    setShowModal(true);
    
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const creditsToSend = parseInt(e.target.value);
    setCredits(creditsToSend);
  }


  return (
    <div>
      <h1 className="text-5xl text-blue-800 ">
        {`Welcome in the Exchange Page!`}
      </h1>
      <h1 className="mt-5">User Data</h1>
      <p className="text-3xl ">Name: {profile.name}</p>
      <p className="text-3xl ">Role: {profile.role}</p>
      <p className="text-3xl ">City: {profile.city}</p>
      <p className="text-3xl ">Address: {profile.address}</p>
      <p className="text-3xl ">Balance: {profile.wallet_balance}</p>

      <h1 className="mt-5">Actor Data to Send Credits</h1>
      <p className="text-3xl ">Name: {datiAttore.name}</p>
      <p className="text-3xl ">Role: {datiAttore.role}</p>
      <p className="text-3xl ">City: {datiAttore.city}</p>
      <p className="text-3xl ">Address: {datiAttore.address}</p>
      <p className="text-3xl ">Balance: {datiAttore.wallet_balance}</p>

      <div className="flex text-sm place-items-center-safe">
        <h1 className="text-red-800 mt-5">
          How many credits do you want to send?
        </h1>
        <div className="flex m-2 pt-5">
          <input className="w-12 p-2 m-2 border-2 border-red-800 rounded-lg"
            type="number"
            placeholder="0"
            min={0}
            max={profile.wallet_balance}
            onChange={handleInputChange}
            value={credits}
          />
          <button className="w-12 p-2 m-2 border-2 border-red-800 rounded-lg"
            onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
      {showModal && <Modal credits={credits} profile={profile} onClose={() => setShowModal(false)} />}
      <button className=" border-2 border-blue-800 p-2 rounded-lg m-5"
        onClick={() => {
          sessionStorage.removeItem("datiAttore");
          navigate(-1)
        }}
      >
        Go Back to Actors List
      </button>
    </div>
  );
}
