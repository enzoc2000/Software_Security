import { useEffect, useState } from "react";
import { EmissionDTO } from "../../../server/src/Models/EmissionDTO";
import { useAuth } from "./useAuth";

export function useVerifyEmissions(profileId: number) {
    const API_PORT = import.meta.env.VITE_SERVER_PORT;
    const { token } = useAuth();
    const [datiEmissioni, setDatiEmissioni] = useState<EmissionDTO[]>([]);

    useEffect(() => {
        if (profileId <= 0) {
            return;
        }
        fetch(`http://localhost:${API_PORT}/api/logEmissions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ profileId: profileId }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Log Emissions failed");
                return res.json();
            })
            .then((data: EmissionDTO[]) => {
                setDatiEmissioni(data);
            })
            .catch((err) => {
                console.error(err.message);
                // se il token è scaduto / invalido, torno al login
            })
    }, [profileId, API_PORT, token]);

    return { datiEmissioni };
}
