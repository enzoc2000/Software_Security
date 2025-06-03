import { useNavigate } from "react-router-dom";
import { useVerifyAuth } from "../hooks/useVerifyAuth";
import { UserDTO } from "../Models/UserDTO";
import { useEffect, useState } from "react";
import connectWallet from "../utils/ConnectWallet";

const NO_SYMBOLS = [",", ".", "?", "|", `"`, "'", "=", "&"];
const API_PORT = import.meta.env.VITE_SERVER_PORT;

function hasForbiddenSymbol(value: string): boolean {
    return NO_SYMBOLS.some(sym => value.includes(sym));
}

function isLengthValid(value: string, min = 3, max = 50): boolean {
    return value.length >= min && value.length <= max;
}


function isFieldOK(value: string): boolean {
    return isLengthValid(value) && !hasForbiddenSymbol(value);
}
function userOK(user: { username: string, password: string, walletAddress: string }): boolean {
    const { username, password, walletAddress } = user;

    // Tutti e tre i campi devono essere “OK”
    const allFieldsValid =
        isFieldOK(username) &&
        isFieldOK(password) &&
        isFieldOK(walletAddress);

    // E devono essere tutti distinti
    const allDistinct =
        username !== password &&
        username !== walletAddress &&
        password !== walletAddress;

    return allFieldsValid && allDistinct;
}

async function updateProfile(datiUtente: UserDTO, user: Utente, token: string): Promise<boolean> {
    const res = await fetch(`http://localhost:${API_PORT}/api/updateProfile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            userData: datiUtente,
            userCredentials: user
        }),
    });
    if (!res.ok) throw new Error("Update profile failed");
    return res.json();
}

interface Utente {
    username: string;
    password: string;
    walletAddress: string;
}

export function Settings() {
    const { profile, token } = useVerifyAuth();
    const navigate = useNavigate();
    const [datiUtente, setDatiUtente] = useState<UserDTO>();
    const [user, setUser] = useState<Utente>({
        username: "",
        password: "",
        walletAddress: ""
    });
    const [enabledName, setEnabledName] = useState(false);
    const [enabledEmail, setEnabledEmail] = useState(false);
    const [enabledAddress, setEnabledAddress] = useState(false);
    const [enabledCity, setEnabledCity] = useState(false);

    useEffect(() => {
        if (!profile) return;
        if (!token) return;
        setDatiUtente(profile)
    }, [profile, token]);

    if (!profile || !token || !datiUtente) {
        return <div>Loading profile...</div>;
    }

    const buttonConnectWallet = async () => {
        const objPromise = connectWallet();
        setUser({
            ...user!,
            walletAddress: (await objPromise).address
        });
    }

    const handleInputChange = (name: string, e: string) => {
        setDatiUtente({
            ...datiUtente!,
            [name]: e
        });
    }

    const handleUserInputChange = (name: string, e: string) => {
        setUser({
            ...user!,
            [name]: e
        });
    }

    const handleSumbit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isSame =
            profile.name === datiUtente.name &&
            profile.email === datiUtente.email &&
            profile.city === datiUtente.city &&
            profile.address === datiUtente.address;

        if (isSame) {
            alert("Nothing to update");
            return;
        }
        const userCredentials = { ...user };
        setUser({
            username: "",
            password: "",
            walletAddress: ""
        })
        if (!userOK(userCredentials)) {
            alert("Not valid credentials");
            return;
        }
        const resOK = await updateProfile(datiUtente, userCredentials, token);
        if (!resOK) {
            alert("Update profile failed");
        }
        alert("Profile updated");
        navigate(-1);
    }

    return (
        <div className="flex flex-col w-screen h-screen place-items-center">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <h2 className="text-2xl">Here you can change your information</h2>
            <div className="grid text-3xl w-[80%] m-2 p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                Your information:
                <p className="text-2xl">Name: {profile.name}</p>
                <p className="text-2xl">Email: {profile.email}</p>
                <p className="text-2xl">City: {profile.city}</p>
                <p className="text-2xl">Address: {profile.address}</p>
            </div>
            <div className="grid text-3xl w-[80%] m-2 p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                Your new information:
                <p className="text-sm">Select the checkbox if you want to change the information</p>
                <div className="grid flex-wrap m-1 text-2xl items-center-safe " >
                    <p>Name:</p>
                    <input className="border-2 border-blue-800 p-2 rounded-lg m-1"
                        type="text"
                        name="name"
                        placeholder="insert new name"
                        value={datiUtente.name}
                        disabled={!enabledName}
                        onChange={(e) => handleInputChange("name", e.target.value)} />
                    <input className="peer"
                        type="checkbox"
                        checked={enabledName}
                        onChange={() => setEnabledName(!enabledName)}>
                    </input>
                </div>
                <div className="grid flex-wrap m-1 text-2xl items-center-safe " >
                    <p>Email:</p>
                    <input className="border-2 border-blue-800 p-2 rounded-lg m-1"
                        type="text"
                        name="email"
                        placeholder="insert new email"
                        value={datiUtente.email}
                        disabled={!enabledEmail}
                        onChange={(e) => handleInputChange("email", e.target.value)} />
                    <input className="peer"
                        type="checkbox"
                        checked={enabledEmail}
                        onChange={() => setEnabledEmail(!enabledEmail)}>
                    </input>
                </div>
                <div className="grid flex-wrap m-1 text-2xl items-center-safe " >
                    <p>City:</p>
                    <input className="border-2 border-blue-800 p-2 rounded-lg m-1"
                        type="text"
                        name="city"
                        placeholder="insert new city"
                        value={datiUtente.city}
                        disabled={!enabledCity}
                        onChange={(e) => handleInputChange("city", e.target.value)} />
                    <input className="peer"
                        type="checkbox"
                        checked={enabledCity}
                        onChange={() => setEnabledCity(!enabledCity)}>
                    </input>
                </div>
                <div className="grid flex-wrap m-1 text-2xl items-center-safe " >
                    <p>Address:</p>
                    <input className="border-2 border-blue-800 p-2 rounded-lg m-1"
                        type="text"
                        name="address"
                        placeholder="insert new address"
                        value={datiUtente.address}
                        disabled={!enabledAddress}
                        onChange={(e) => handleInputChange("address", e.target.value)} />
                    <input className="peer"
                        type="checkbox"
                        checked={enabledAddress}
                        onChange={() => setEnabledAddress(!enabledAddress)}>
                    </input>
                </div>
            </div>
            <div className="grid text-3xl w-[80%] m-2 p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                Insert your credentials to change your information:
                <div className="grid flex-wrap m-1 text-2xl items-center-safe " >
                    <input className="border-2 border-blue-800 p-2 rounded-lg m-1"
                        type="text"
                        name="username"
                        placeholder="insert your username"
                        value={user.username}
                        onChange={(e) => handleUserInputChange("username", e.target.value)} />
                    <input className="border-2 border-blue-800 p-2 rounded-lg m-1"
                        type="password"
                        name="password"
                        placeholder="insert your password"
                        value={user.password}
                        onChange={(e) => handleUserInputChange("password", e.target.value)} />
                    <input className="border-2 border-blue-800 p-2 rounded-lg m-1"
                        type="text"
                        name="walletAddress"
                        placeholder="click to connect your wallet"
                        value={user.walletAddress}
                        onChange={(e) => handleUserInputChange("walletAddress", e.target.value)}
                        onClick={buttonConnectWallet}
                        readOnly />

                    <button className="flex justify-center text-2xl border-2 border-blue-800 p-2 rounded-lg m-5"
                        onClick={handleSumbit}>
                        Save changes
                    </button>
                </div>
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