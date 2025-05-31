import { useEffect, useState } from "react";
import { UserDebtDTO } from "../../../server/src/Models/UserDebtDTO";
import { useAuth } from "./useAuth";

export function useVerifyActorsDebts(profileId: number) {
    const API_PORT = import.meta.env.VITE_SERVER_PORT;
    const { token } = useAuth();
    const [dataActorsInDebt, setdatiAttori] = useState<UserDebtDTO[]>([]);

    useEffect(() => {
        if (profileId <= 0) {
            return;
        }
        fetch(`http://localhost:${API_PORT}/api/listActorsDebts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({id: profileId}),
        })
            .then((res) => {
                if (!res.ok) throw new Error("List actors with debt failed");
                return res.json();
            })
            .then((data: UserDebtDTO[]) => {
                setdatiAttori(data);
            })
            .catch((err) => {
                console.error(err.message);
                // se il token è scaduto / invalido, torno al login
            })
    }, [profileId, API_PORT, token]);

    return { dataActorsInDebt };
}
