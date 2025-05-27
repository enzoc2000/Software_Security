import { useVerifyAuth } from "../hooks/useVerifyAuth";
import { Link } from "react-router-dom";
import Card from "./card";
import { UserDTO } from "../../../server/src/Models/UserDTO";
import { useVerifyActors } from "../hooks/useVerifyActors";
import Navbar from "./Navbar";



export function FirstPage() {
  const { profile } = useVerifyAuth();
  const { datiAttori } = useVerifyActors(profile.id);

  console.log(datiAttori);
  console.log(profile);
  if (!profile) {
    // finché non ho caricamento completo
    return <div>Loading profile…</div>;
  }

  if (!datiAttori) {
    return <div>Loading actors…</div>;
  }

  const handleCardClick = (item: UserDTO) => {
    // Store the selected item in sessionStorage.
    // Could be used to pass data to another page.
    sessionStorage.setItem("datiAttore", JSON.stringify(item));
  };


  return (
    <div className="flex flex-col h-screen w-screen " >
      <Navbar />
      <span className="text-6xl text-blue-800 mt-2">{`Welcome ${profile.name}!`}</span>
      <div className="grid grid-colsm-4 text-5xl mt-5">
        <div className="flex">
          <h2 className="text-red-800">User:</h2>
          <p>{profile.name}</p>
        </div>
        <div className="flex ">
          <h2 className=" text-red-800">Role:</h2>
          <p>{profile.role}</p>
        </div>
        <div className="flex">
          <h2 className="text-red-800">City:</h2>
          <p>{profile.city}</p>
        </div>
        <div className="flex">
          <h2 className="text-red-800">Address:</h2>
          <p>{profile.address}</p>
        </div>
        <div className="flex" >
          <h2 className="text-red-800 ">Your wallet balance is:</h2>
          <p>{profile.wallet_balance}</p>
        </div>
      </div>
      <h1 className="text-5xl text-red-800 mt-5">
        {`Here you will find all the actors!`}
      </h1>
      <p className="text-2xl ">
        {`Click on an actor to send credits!`}
      </p>
      <div className="flex flex-wrap w-screen place-items-center" >
        {datiAttori.map((item: UserDTO) => (
          <Link
            to={`/ExchangePage/${item.id}`}
            key={item.id}
            onClick={() => handleCardClick(item)}
          >
            <Card key={item.id} name={item.name} role={item.role} walletBalance={item.wallet_balance!} />
          </Link>
        ))}
      </div>
    </div>
  )
}
