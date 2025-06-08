import { useEffect, useState } from "react";
import { UserDTO } from "../Models/UserDTO";
import { useAuth } from "./useAuth";

export function useVerifyActors(profileId: number) {
    const API_PORT = import.meta.env.VITE_SERVER_PORT ?? 3010; // Default port if not set
    const { token } = useAuth();
    const [datiAttori, setdatiAttori] = useState<UserDTO[]>([]);

    useEffect(() => {
        if (profileId <= 0) {
            return;
        }
        fetch(`http://localhost:${API_PORT}/api/listActors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: profileId }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("List actors failed");
                return res.json();
            })
            .then((data: UserDTO[]) => {
                setdatiAttori(data);
            })
            .catch((err) => {
                console.error(err.message);
                // se il token è scaduto / invalido, torno al login
            })
    }, [profileId, API_PORT, token]);

    return { datiAttori };
}
