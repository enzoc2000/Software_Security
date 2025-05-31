import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export function useVerifyBalance(profileAddress: string, profileId: number) {
    const API_PORT = import.meta.env.VITE_SERVER_PORT;
    const { token } = useAuth();
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        if (profileId <= 0 || profileAddress === "") {
            return;
        }
        fetch(`http://localhost:${API_PORT}/api/getBalance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({profileAddress: profileAddress, profileId: profileId }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Get Balance failed");
                return res.json();
            })
            .then((data: number) => {
                setBalance(data);
            })
            .catch((err) => {
                console.error(err.message);
                // se il token è scaduto / invalido, torno al login
            })
    }, [profileAddress,profileId, API_PORT, token]);

    return { balance };
}
