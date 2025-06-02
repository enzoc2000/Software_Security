import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVerifyAuth } from "../hooks/useVerifyAuth";
import { Modal } from "./Modal";
import { UserDebtDTO } from "../Models/UserDebtDTO";

export function ExchangePage() {
  const { profile } = useVerifyAuth();
  const navigate = useNavigate();

  const [dataActorsInDebt, setDataActorsInDebt] = useState<UserDebtDTO | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const storedAttore = sessionStorage.getItem("dataActorsInDebt");

    if (storedAttore) {
      setDataActorsInDebt(JSON.parse(storedAttore) as UserDebtDTO);
    }

  }, [profile]);

  if (!profile) {
    return <div>Loading profile…</div>;
  }

  if (!dataActorsInDebt) {
    return <div>No data found.</div>;
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if ((profile.wallet_balance ?? 0) < credits || credits <= 0) {
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
    <div className=" m-5">
      <h1 className="text-5xl text-blue-800 ">
        {`Welcome in the Exchange Page!`}
      </h1>
      <h1 className="mt-5">User Data</h1>
      <p className="text-3xl ">Name: {profile.name}</p>
      <p className="text-3xl ">Role: {profile.role}</p>
      <p className="text-3xl ">Balance: {profile.wallet_balance}</p>

      <h1 className="mt-5">Actor Data to Send Credits</h1>
      <p className="text-3xl ">Name: {dataActorsInDebt.name}</p>
      <p className="text-3xl ">Role: {dataActorsInDebt.role}</p>
      <p className="text-3xl ">Debt: {dataActorsInDebt.debt}</p>


      <div className="flex flex-col p-2 m-2 place-items-center-safe border-2 rounded-lg border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 ">
        <h1 className="text-red-800 mt-5">
          How many credits do you want to send?
        </h1>
        <div className="flex m-2 pt-5">
          <input className=" p-2 m-2 border-2 border-red-800 rounded-lg"
            type="number"
            placeholder="0"
            min={0}
            max={profile.wallet_balance && dataActorsInDebt.debt}
            onChange={handleInputChange}
            value={credits}
          />
          <button className=" p-2 m-2 border-2 border-red-800 rounded-lg"
            onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed p-5 inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <Modal credits={credits} profile={profile} onClose={() => setShowModal(false)} />
        </div>
      )}
      <button className=" border-2 border-blue-800 p-2 rounded-lg m-5"
        onClick={() => {
          sessionStorage.removeItem("dataActorsInDebt");
          navigate(-1)
        }}>
        Go Back to first page
      </button>
    </div>
  );
}
