import { useNavigate } from "react-router-dom";
import { UserDTO } from "../../../server/src/Models/UserDTO";
import { useVerifyActors } from "../hooks/useVerifyActors";
import { useVerifyAuth } from "../hooks/useVerifyAuth";
import {Card} from "./card";

export function ListActors() {
    const { profile } = useVerifyAuth();
    const { datiAttori } = useVerifyActors(profile.id);
    const navigate = useNavigate();

    if (!profile) {
        // finché non ho caricamento completo
        return <div>Loading profile…</div>;
    }

    if (!datiAttori) {
        return <div>Loading actors…</div>;
    }

    return (
        <div className="flex flex-col w-screen h-screen place-items-center">
            <h1 className="text-2xl font-bold mb-4">Actors List</h1>
            <div className="flex flex-wrap w-screen place-items-center" >
                {datiAttori.map((item: UserDTO) => (
                    <Card key={item.id} name={item.name} role={item.role} walletBalance={item.wallet_balance!} />
                ))}
            </div>
            <button className=" border-2 border-blue-800 p-2 rounded-lg m-5"
                onClick={() => {
                    sessionStorage.removeItem("datiAttore");
                    navigate(-1)
                }}
            >
                Go Back to first page
            </button>
        </div >
    );
}