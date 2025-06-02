import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { UserLatestEmissionDTO } from "../Models/UserLatestEmissionDTO";

export function useVerifyLatestEmissions() {
    const API_PORT = import.meta.env.VITE_SERVER_PORT;
    const { token } = useAuth();
    const [latestEmissionData, setlatestEmissionData] = useState<UserLatestEmissionDTO[]>([]);

    useEffect(() => {
        if(!token) return;

        fetch(`http://localhost:${API_PORT}/api/listActorsLatestEmissions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Finding Latest Emissions failed");
                return res.json();
            })
            .then((data: UserLatestEmissionDTO[]) => {
                setlatestEmissionData(data);
            })
            .catch((err) => {
                console.error(err.message);
                // se il token è scaduto / invalido, torno al login
            })
    }, [API_PORT, token]);

    return { latestEmissionData };
}
