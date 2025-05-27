import { useNavigate } from "react-router-dom";
import { useVerifyAuth } from "../hooks/useVerifyAuth";
import { useState } from "react";
const VITE_SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

async function submitEmissionsApi(profileId: number, co2Amount: number, token: string) {
    const response = await fetch(`http://localhost:${VITE_SERVER_PORT}/api/submitEmissions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profileId, co2Amount }),
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error("Submit emissions failed: " + err.error);
    }
    const res = await response.json();
    return res;
}
export function CreditsIssuing() {
    const { profile, token } = useVerifyAuth();
    const navigate = useNavigate();
    const [co2, setCo2] = useState<number>(0);


    if (!token) {
        return <div>Loading token…</div>;
    }
    if (!profile) {
        return <div>Loading profile…</div>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const co2Amount = parseInt(e.target.value);
        setCo2(co2Amount);
    };

    const handleSubmit = async () => {
        if (co2 <= 0) {
            alert("Please enter a positive value.");
            return;
        }
        const emission = await submitEmissionsApi(profile.id, co2, token);
        console.log(emission);
        if (!emission) {
            alert("Emission submission failed.");
        }
        alert("Emission submitted successfully!");
        navigate(-1);

    };
    return (
        <div className="flex flex-col w-screen h-screen place-items-center">
            <h1 className="text-2xl font-bold mb-4">Credits Issuing</h1>
            <div className="flex flex-col p-2 m-2 place-items-center-safe border-2 rounded-lg border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 ">
                <h1 className="text-red-800 mt-5">
                    How many Tons of emissions do you produce?
                </h1>
                <div className="flex m-2 pt-5">
                    <input className=" p-2 m-2 border-2 border-red-800 rounded-lg"
                        type="number"
                        placeholder="0"
                        min={0}
                        max={100000}
                        onChange={handleInputChange}
                        value={co2}
                    />
                    <button className=" p-2 m-2 border-2 border-red-800 rounded-lg"
                        onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
            <button className=" border-2 border-blue-800 p-2 rounded-lg m-5"
                onClick={() => {
                    navigate(-1)
                }}
            >
                Go Back to Actors List
            </button>
        </div>
    );
}