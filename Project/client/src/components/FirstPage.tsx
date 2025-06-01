import { useVerifyAuth } from "../hooks/useVerifyAuth";
import { Link } from "react-router-dom";
import { useVerifyActorsDebts } from "../hooks/useVerifyActorsDebts";
import Navbar from "./Navbar";
import { LatestEmissionCard } from "./LatestEmissionCard";
import { UserLatestEmissionDTO } from "../../../server/src/Models/UserLatestEmissionDTO";
import { useVerifyLatestEmissions } from "../hooks/useVerifyLatestEmissions";
import { useEffect, useState } from "react";
import { UserDebtDTO } from "../../../server/src/Models/UserDebtDTO";
import { DebtCard } from "./DebtCard";
import { useVerifyBalance } from "../hooks/useVerifyBalance";



export function FirstPage() {
  const { profile } = useVerifyAuth();
  const { balance } = useVerifyBalance(profile.wallet_address ?? "", profile.id);
  const { dataActorsInDebt } = useVerifyActorsDebts(profile.id);
  const { latestEmissionData } = useVerifyLatestEmissions();
  const [co2Sum, setCo2Sum] = useState(0);
  const [globalThreshold, setGlobalThreshold] = useState(0);

  useEffect(() => {
    // Calcola la somma dei CO2
    if (latestEmissionData && latestEmissionData.length > 0) {
      const sommaEmissioni = latestEmissionData
        .map(e =>
          e.co2_amount
        )
        .reduce((acc, cur) => acc + cur, 0);

      const sommaTreshold = latestEmissionData
        .map(e =>
          e.treshold
        )
        .reduce((acc, cur) => acc + cur, 0);

      setCo2Sum(sommaEmissioni);

      setGlobalThreshold(sommaTreshold);
    } else {
      setCo2Sum(0);
      setGlobalThreshold(0);
    }
  }, [latestEmissionData]);

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

  const handleCardClick = (item: UserDebtDTO) => {
    // Store the selected item in sessionStorage.
    // Could be used to pass data to another page.
    sessionStorage.setItem("dataActorsInDebt", JSON.stringify(item));
  };

  return (
    <div className="flex flex-col h-screen w-screen " >
      <Navbar />
      <span className="text-6xl text-blue-800 mt-2">{`Welcome ${profile.name}!`}</span>
      <div className="grid grid-colsm-4 text-5xl mt-5">
        <div className="flex">
          <h2 className="text-red-800">User:</h2>
          <p className="ml-2 font-bold">{profile.name}</p>
        </div>
        <div className="flex ">
          <h2 className=" text-red-800">Role:</h2>
          <p className="ml-2 font-bold">{profile.role}</p>
        </div>
        <div className="flex">
          <h2 className="text-red-800">City:</h2>
          <p className="ml-2 font-bold">{profile.city}</p>
        </div>
        <div className="flex">
          <h2 className="text-red-800">Address:</h2>
          <p className="ml-2 font-bold">{profile.address}</p>
        </div>
        <div className="flex" >
          <h2 className="text-red-800 ">Your wallet balance is:</h2>
          <p className="ml-2 font-bold">{balance}</p>
        </div>
      </div>
      <h1 className="text-5xl text-red-800 mt-5">
        {`Here you will find all the actors with debts!`}
      </h1>
      <p className="text-2xl ">
        {`Click on an actor to send credits!`}
      </p>
      <div className="flex flex-wrap w-screen place-items-center" >
        {dataActorsInDebt.map((item: UserDebtDTO) => (
          <Link
            to={`/ExchangePage/${item.id}`}
            key={item.id}
            onClick={() => handleCardClick(item)}
          >
            <DebtCard key={item.id} name={item.name} role={item.role} debt={item.debt} id={item.id} />
          </Link>
        ))}
      </div>
      <h1 className="text-5xl text-red-800 mt-5">
        {`Here you will find all the actors latest emissions!`}
      </h1>
      <div className="flex flex-wrap w-screen place-items-center" >
        <div className="flex flex-wrap w-screen place-items-center" >
          {latestEmissionData.map((item: UserLatestEmissionDTO) => (
            <LatestEmissionCard key={item.id_emission} co2_amount={item.co2_amount} date={item.date} id_emission={item.id_emission} actor_name={item.actor_name} actor_role={item.actor_role} treshold={item.treshold} />
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
                    `ml-2 font-bold ${globalThreshold - co2Sum > 0
                      ? "text-green-500"
                      : "text-red-800"
                    }`}>
                  {co2Sum}
                </h2>
              </div>
              <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                <h2>
                  Threshold:
                </h2>
                <h2 className="ml-2 font-bold text-red-800 " >
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
