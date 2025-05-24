import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVerifyAuth } from "../hooks/useVerifyAuth";
import { UserDTO } from "../../../server/src/Models/UserDTO";
//import Modal from "./Modal";

export function ExchangePage() {
  const { profile } = useVerifyAuth();
  const { id } = useParams<{ id: string }>();

  const [datiAttore, setDatiAttore] = useState<UserDTO| null>(null);
  
  useEffect(() => {
    const storedAttore = sessionStorage.getItem("datiAttore");

    if (storedAttore) {
      setDatiAttore(JSON.parse(storedAttore) as UserDTO);
    }
  }, [id]);

  if (!profile) {
    return <div>Loading profile…</div>;
  }

  if (!datiAttore) {
    return <div>No data found.</div>;
  }

  return (
    <div>
      <h1 className="text-5xl text-red-800 ">
        {`Benvenuto nella pagina di invio dei crediti!`}
      </h1>
      <h1>Dati Utente</h1>
      <p className="text-3xl ">Name: {profile.name}</p>
      <p className="text-3xl ">Role: {profile.role}</p>
      <p className="text-3xl ">City: {profile.city}</p>
      <p className="text-3xl ">Address: {profile.address}</p>
      <p className="text-3xl ">Balance: {profile.wallet_balance}</p>

      <h1>Dati Attore a cui inviare crediti</h1>
      <p className="text-3xl ">Name: {datiAttore.name}</p>
      <p className="text-3xl ">Role: {datiAttore.role}</p>
      <p className="text-3xl ">City: {datiAttore.city}</p>
      <p className="text-3xl ">Address: {datiAttore.address}</p>
      <p className="text-3xl ">Balance: {datiAttore.wallet_balance}</p>
      {/* <Modal/> */}
    </div>
  );
}
