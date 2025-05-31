import { UserLatestEmissionDTO } from "../../../server/src/Models/UserLatestEmissionDTO";

export function LatestEmissionCard(emission: UserLatestEmissionDTO) {
    const emissionobj = new Date(emission.date);
    const data = emissionobj.toLocaleString('it-IT', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
    });
    return (
        <>
            <div className="grid m-2 border-2 rounded-lg text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    <h2>
                        Name:
                    </h2>
                    <h2 className="ml-2 font-bold text-blue-800 " >
                        {emission.actor_name}
                    </h2>
                </div>
                <div className="flex flex-wrap p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    <h2>
                        Role:
                    </h2>
                    <h2 className="ml-2 font-bold text-blue-800 " >
                        {emission.actor_role}
                    </h2>
                </div>
                <div className="flex border-2 text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                    <div className="flex flex-wrap p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                        <h2>
                            Date:
                        </h2>
                        <h2 className="ml-2 font-bold" >
                            {data}
                        </h2>
                    </div>
                    <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                        <h2>
                            Tons of CO2 emitted:
                        </h2>
                        <h2 className={
                            `ml-2 font-bold ${emission.treshold - emission.co2_amount > 0
                                ? "text-green-500"
                                : "text-red-950"
                            }`}>
                            {emission.co2_amount}
                        </h2>
                    </div>
                    <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                        <h2>
                            Threshold:
                        </h2>
                        <h2 className="ml-2 font-bold text-red-800 " >
                            {emission.treshold}
                        </h2>
                    </div>
                </div>
            </div>
        </>

    );
}