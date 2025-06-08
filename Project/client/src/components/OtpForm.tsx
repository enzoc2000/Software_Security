import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth"; // il vostro contesto
import { useNavigate } from "react-router-dom";
import { UserDTO } from "../Models/UserDTO";

interface Props {
  userId: number;
}

export function OtpForm({ userId }: Props) {
  const [code, setCode] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const VITE_SERVER_PORT = import.meta.env.VITE_SERVER_PORT ?? 3010; // Default port if not set

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    // 2. Chiamata a /api/verify-otp
    const res = await fetch(`http://localhost:${VITE_SERVER_PORT}/api/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, code }),
    });
    if (!res.ok) {
      const err = await res.json();
      alert("Verifica OTP fallita: " + err.message);
      return;
    }
    // OTP corretto: recuperiamo user e token
    const data = await res.json() as { utenteAutenticato: UserDTO; token: string };
    // Salviamo token + utente nel contesto
    login(data.token, data.utenteAutenticato);
    // Naviga alla firstPage
    navigate("/firstPage");
  }

  return (
    <form className="flex flex-col w-screen h-screen place-items-center" 
    onSubmit={handleVerify}>
      <h1>Inserisci l’OTP ricevuto via email</h1>
      <input className="border-2 rounded-lg p-2 m-4 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800"
        type="text"
        placeholder="OTP (6 cifre)"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <button className="border-2 rounded-lg p-2 m-4 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800" 
      type="submit">Verifica OTP</button>
    </form>
  );
}
