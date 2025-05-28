import { useEffect, useState } from "react";
import { UserDTO } from "../../../server/src/Models/UserDTO";
import { useAuth } from "./useAuth";

export function useVerifyActorsDebts() {
    const API_PORT = import.meta.env.VITE_SERVER_PORT;
    const { token } = useAuth();
    const [dataActorsInDebt, setdatiAttori] = useState<UserDTO[]>([]);

    useEffect(() => {
        fetch(`http://localhost:${API_PORT}/api/listDebtsActors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
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
    }, [API_PORT, token]);

    return { dataActorsInDebt };
}
