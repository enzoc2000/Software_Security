import { useNavigate } from "react-router-dom";
import { useVerifyAuth } from "../hooks/useVerifyAuth";

export function CreditsIssuing() {
    const { profile } = useVerifyAuth();
    const navigate = useNavigate();
    return (
        <div className="flex flex-col w-screen h-screen place-items-center">
            <h1 className="text-2xl font-bold mb-4">Credits Issuing</h1>
            <h1 className="text-3xl text-blue-800">
                {`Welcome ${profile.name} in the Credits Issuing Page!`}
            </h1>
            <button className=" border-2 border-blue-800 p-2 rounded-lg m-5"
                onClick={() => {
                    sessionStorage.removeItem("datiAttore");
                    navigate(-1)
                }}
            >
                Go Back to Actors List
            </button>
        </div>
    );
}