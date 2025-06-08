import { useEffect, useState } from "react";
import { UserDebtDTO } from "../Models/UserDebtDTO";
import { useAuth } from "./useAuth";

export function useVerifyActorsDebts(profileId: number) {
    const API_PORT = import.meta.env.VITE_SERVER_PORT || 3010; // Default port if not set
    const { token } = useAuth();
    const [dataActorsInDebt, setActorsInDebt] = useState<UserDebtDTO[]>([]);
    const [userDebt, setUserDebt] = useState<number>(0);

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
            .then((data: { usersDebt: UserDebtDTO[]; userDebt: number }) => {
                setActorsInDebt(data.usersDebt);
                setUserDebt(data.userDebt);
            })
            .catch((err) => {
                console.error(err.message);
                // se il token è scaduto / invalido, torno al login
            })
    }, [profileId, API_PORT, token]);

    return { dataActorsInDebt, userDebt };
}
