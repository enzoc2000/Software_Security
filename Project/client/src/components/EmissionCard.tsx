import { EmissionDTO } from "../../../server/src/Models/EmissionDTO";

export function EmissionCard(emission: EmissionDTO) {
    const emissionobj = new Date(emission.date);
    const data = emissionobj.toISOString().slice(0, 10)
    const threshold = 100;
    return (
        <>
            <div className="flex m-2 border-2 rounded-lg text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <div className="flex flex-wrap p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    <h2>
                        Date:
                    </h2>
                    <h2 className="ml-2 text-red-800 " >
                        {data}
                    </h2>
                </div>
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                    <h2>
                        Tons of CO2 emitted:
                    </h2>
                    <h2 className="ml-2 text-red-800 " >
                        {emission.co2_amount}
                    </h2>
                </div>
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                    <h2>
                        Threshold:
                    </h2>
                    <h2 className="ml-2 text-red-800 " >
                        {threshold}
                    </h2>
                </div>
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                    <h2>
                        Credit assigned:
                    </h2>
                    <h2 className="ml-2 text-red-800 " >
                        {threshold - emission.co2_amount} 
                    </h2>
                </div>
            </div>
        </>

    );
}