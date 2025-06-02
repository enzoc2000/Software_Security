import { useEffect, useState } from "react";
import { TransactionDTO } from "../Models/TransactionDTO";
import { useAuth } from "./useAuth";

export function useVerifyTransactions() {
    const API_PORT = import.meta.env.VITE_SERVER_PORT;
    const { token } = useAuth();
    const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

    useEffect(() => {
        if (!token) return;
        fetch(`http://localhost:${API_PORT}/api/transactionslog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error("Transactions log failed");
                return res.json();
            })
            .then((data: TransactionDTO[]) => {
                setTransactions(data);
            })
            .catch((err) => {
                console.error(err.message);
            })
    }, [ API_PORT, token]);

    return { transactions };
}
