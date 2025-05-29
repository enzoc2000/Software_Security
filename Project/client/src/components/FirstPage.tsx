import { useVerifyAuth } from "../hooks/useVerifyAuth";
import { Link } from "react-router-dom";
import Card from "./card";
import { UserDTO } from "../../../server/src/Models/UserDTO";
import { useVerifyActorsDebts } from "../hooks/useVerifyActorsDebts";
import Navbar from "./Navbar";
import { LatestEmissionCard } from "./LatestEmissionCard";
import { ActorsLatestEmission } from "../../../server/src/Models/ActorsLatestEmission";
import { useVerifyLatestEmissions } from "../hooks/useVerifyLatestEmissions";
import { useState } from "react";



export function FirstPage() {
  const { profile } = useVerifyAuth();
  const { dataActorsInDebt } = useVerifyActorsDebts();
  const { latestEmissionData } = useVerifyLatestEmissions();
  const [co2Sum, setCo2Sum] = useState(0);
  const globalThreshold = 400;

  if (!profile) {
    // finché non ho caricamento completo
    return <div><h1>Loading profile...</h1></div>;
  }

  if (!dataActorsInDebt) {
    return <div><h1>Loading actors...</h1></div>;
  }

  if (!latestEmissionData) {
    return <div><h1>Loading actors latest emission...</h1></div>;
  }

  const handleCardClick = (item: UserDTO) => {
    // Store the selected item in sessionStorage.
    // Could be used to pass data to another page.
    sessionStorage.setItem("dataActorsInDebt", JSON.stringify(item));
  };

  try {
    latestEmissionData.forEach(element => {
      const co2 = element.co2_amount;
      setCo2Sum(co2Sum + co2);
    });
  } catch (error) {
    console.log(error);
  }


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
        {`Here you will find all the actors with debts!`}
      </h1>
      <p className="text-2xl ">
        {`Click on an actor to send credits!`}
      </p>
      <div className="flex flex-wrap w-screen place-items-center" >
        {dataActorsInDebt.map((item: UserDTO) => (
          <Link
            to={`/ExchangePage/${item.id}`}
            key={item.id}
            onClick={() => handleCardClick(item)}
          >
            <Card key={item.id} name={item.name} role={item.role} walletBalance={item.wallet_balance!} />
          </Link>
        ))}
      </div>
      <h1 className="text-5xl text-red-800 mt-5">
        {`Here you will find all the actors latest emissions!`}
      </h1>
      <div className="flex flex-wrap w-screen place-items-center" >
        <div className="flex flex-wrap w-screen place-items-center" >
          {latestEmissionData.map((item: ActorsLatestEmission) => (
            <LatestEmissionCard key={item.id_emission} co2_amount={item.co2_amount} date={item.date} id_emission={item.id_emission} actor_name={item.actor_name} />
          ))}
        </div>
        <div>
          <div className="grid m-2 border-2 rounded-lg text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
            <div className="flex flex-wrap p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
              <h2>
                Global Emissions Threshold:
              </h2>
            </div>
            <div className="flex border-2 text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
              <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                <h2>
                  Tons of CO2 emitted:
                </h2>
                <h2
                  className={
                    `ml-2 ${globalThreshold - co2Sum > 0
                      ? "text-green-800"
                      : "text-red-800"
                    }`}>
                  {co2Sum}
                </h2>
              </div>
              <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                <h2>
                  Threshold:
                </h2>
                <h2 className="ml-2 text-red-800 " >
                  {globalThreshold}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
