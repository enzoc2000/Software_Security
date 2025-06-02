import { useNavigate } from "react-router-dom";
import { useVerifyAuth } from "../hooks/useVerifyAuth";
import { EmissionDTO } from "../Models/EmissionDTO";
import { EmissionCard } from "./EmissionCard";
import { useVerifyEmissions } from "../hooks/useVerifyEmissions";

export function EmissionsLog() {
    const { profile, token } = useVerifyAuth();
    const { datiEmissioni } = useVerifyEmissions(profile.id);
    const navigate = useNavigate();

    if (!profile)
        return <div>Loading profile...</div>;
    if (!token)
        return <div>Loading token...</div>;
    if (!datiEmissioni)
        return <div>Loading Emissions...</div>;

    return (
        <div className="flex flex-col w-screen h-screen place-items-center">
            <h1 className="text-2xl font-bold mb-4">Emissions Log</h1>
            <div className="grid grid-cols-4 w-[80%] border-2 text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800" >
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    Date:
                </div>
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                    Tons of CO2 emitted:
                </div>
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                    Treshold:
                </div>
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                    Carbon Credits:
                </div>
            </div>
            <div className="grid w-[80%] border-2 text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800" >
                {datiEmissioni.map((item: EmissionDTO) => (
                    <EmissionCard key={item.id_emission} co2_amount={item.co2_amount} date={item.date} id_emission={item.id_emission} treshold={item.treshold} carbonCredits={item.carbonCredits} />
                ))}
            </div>
            <button className=" border-2 border-blue-800 p-2 rounded-lg m-5"
                onClick={() => {
                    navigate(-1)
                }}
            >
                Go Back to first page
            </button>
        </div>
    );
}
