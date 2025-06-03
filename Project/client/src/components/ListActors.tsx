import { useNavigate } from "react-router-dom";
import { UserDTO } from "../Models/UserDTO";
import { useVerifyActors } from "../hooks/useVerifyActors";
import { useVerifyAuth } from "../hooks/useVerifyAuth";
import { Card } from "./card";

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
            <div className="grid grid-cols-4 w-[80%] border-2 text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800" >
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    Actor Name:
                </div>
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                    Role:
                </div>
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                    Email:
                </div>
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                    Wallet Balance:
                </div>
            </div>
            <div className="grid w-[80%] border-2 text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800" >
                {datiAttori.map((item: UserDTO) => (
                    <Card key={item.id} name={item.name} role={item.role} email={item.email} walletBalance={item.wallet_balance!} />
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