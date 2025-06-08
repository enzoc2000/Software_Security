import { useNavigate } from "react-router-dom";
import { useVerifyAuth } from "../hooks/useVerifyAuth";
import { useState } from "react";
import { BurnRequestDTO } from "../Models/BurnRequestDTO";
import { Emission } from "../Models/Emission";
import { ethers } from "ethers";
const VITE_SERVER_PORT = import.meta.env.VITE_SERVER_PORT ?? 3010; // Default port if not set
type SubmitEmissionResponse = Emission | BurnRequestDTO;

function isBurnRequestDTO(response: SubmitEmissionResponse): response is BurnRequestDTO {
    return response && typeof response === 'object' && 'requiresBurn' in response;
}
async function submitEmissionsApi(profileId: number, co2Amount: number, token: string): Promise<SubmitEmissionResponse> {
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

async function submitBurnApi(response: BurnRequestDTO, tx: ethers.TransactionResponse, token: string) {
    const res = await fetch(`http://localhost:${VITE_SERVER_PORT}/api/submitBurn`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            requiresBurn: response.requiresBurn,
            userId: response.userId,
            carbonCredits: response.carbonCredits,
            remainingDebt: response.remainingDebt,
            emissionAmount: response.emissionAmount,
            isDonation: response.isDonation,
            idRecipient: response.idRecipient,
            tx: {
                hash: tx.hash,
                contractAddress: response.tx?.contractAddress ?? "",
                from: response.tx?.from ?? "",
                data: response.tx?.data ?? "",
            }
        })
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error("Submit burn failed: " + err.error);
    }
    await res.json();
}


export function CreditsIssuing() {
    const { profile, token } = useVerifyAuth();
    const navigate = useNavigate();
    const [co2, setCo2] = useState<number>(0);
    const [showModal, setShowModal] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading...");



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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (co2 <= 0) {
            alert("Please enter a positive value.");
            return;
        }
        try {
            setLoadingMessage("Submitting emissions...");
            setShowModal(true);
            const response = await submitEmissionsApi(profile.id, co2, token);

            if (!response) {
                setShowModal(false);
                alert("Emission submission failed.");
                return;
            }

            if (isBurnRequestDTO(response)) {
                if (!response.requiresBurn) {
                    // ✅ Caso in cui NON serve il burn → operazione già salvata lato backend
                    alert("Emission submitted successfully!");
                    setShowModal(false);
                    navigate(-1);
                    return;
                }

                // 🔥 Caso in cui serve burn → firma transazione dal frontend
                setLoadingMessage("Waiting for wallet signature...");

                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();

                const tx = await signer.sendTransaction({
                    to: response.tx!.contractAddress,
                    from: response.tx!.from,
                    data: response.tx!.data,
                    value: "0x0"
                });

                setLoadingMessage("Waiting for blockchain confirmation...");
                await tx.wait();

                // ✅ Invia conferma di transazione al backend
                setLoadingMessage("Confirming transaction with backend...");
                await submitBurnApi(response, tx, token);

                alert("Burn transaction completed and saved.");
                setShowModal(false);
                navigate(-1);
            }
            else {
                alert("Emission submitted successfully!");
                setShowModal(false);
                navigate(-1);
            }
        } catch (err) {
            console.error(err);
            setShowModal(false);
            alert("Emission submission failed.");
        }

    };
    return (
        <div className="flex flex-col w-screen h-screen place-items-center">
            <h1 className="text-2xl font-bold mb-4">Credits Issuing</h1>
            <div className="flex flex-col p-2 m-2 place-items-center-safe border-2 rounded-lg border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 ">
                <h1 className="text-red-800 mt-5">
                    How many Tons of emissions do you produce?
                </h1>
                <form className="flex m-2 pt-5" onSubmit={handleSubmit}>
                    <input className=" p-2 m-2 border-2 border-red-800 rounded-lg"
                        type="number"
                        placeholder="0"
                        min={0}
                        max={100000}
                        onChange={handleInputChange}
                        value={co2}
                    />
                    <button className=" p-2 m-2 border-2 border-red-800 rounded-lg"
                        type='submit'
                        disabled={showModal}>
                        Submit
                    </button>
                </form>
                {showModal && (
                    <div className="fixed p-5 inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                        <div className="bg-white p-4 border-2 rounded-lg text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                            <p>{loadingMessage}</p>
                        </div>
                    </div>
                )}
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