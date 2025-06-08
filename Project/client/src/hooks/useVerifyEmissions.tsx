import { useEffect, useState } from "react";
import { EmissionDTO } from "../Models/EmissionDTO";
import { useAuth } from "./useAuth";

export function useVerifyEmissions(profileId: number) {
    const API_PORT = import.meta.env.VITE_SERVER_PORT || 3010; // Default port if not set
    const { token } = useAuth();
    const [datiEmissioni, setDatiEmissioni] = useState<EmissionDTO[]>([]);

    useEffect(() => {
        if (profileId <= 0) {
            return;
        }
        fetch(`http://localhost:${API_PORT}/api/emissionslog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ profileId: profileId }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Emissions log failed");
                return res.json();
            })
            .then((data: EmissionDTO[]) => {
                setDatiEmissioni(data);
            })
            .catch((err) => {
                console.error(err.message);
            })
    }, [profileId, API_PORT, token]);

    return { datiEmissioni };
}
