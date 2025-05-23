import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  id_user: number;
  username: string;
  role: string;
  name: string;
  city: string;
  address: string;
}
export function useVerifyAuth() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const API_PORT = import.meta.env.VITE_SERVER_PORT;

    const [profile, setProfile] = useState<UserProfile | null>(null);
    
    useEffect(() => {
        // se non c’è token → torno al login
        if (!token) {
        navigate("/login");
        return;
        }
        // altrimenti chiedo il profilo
        fetch(`http://localhost:${API_PORT}/api/profilo`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,       // <— qui passo il token
        },
        })
        .then((res) => {
            if (!res.ok) throw new Error("Fetch del profilo fallito");
            return res.json();
        })
        .then((data: UserProfile) => {
            setProfile(data);
        })
        .catch((err) => {
            console.error(err);
            // se il token è scaduto / invalido, torno al login
            navigate("/login")
        });
    }, [token, navigate, API_PORT]);
    
    return { profile };
}