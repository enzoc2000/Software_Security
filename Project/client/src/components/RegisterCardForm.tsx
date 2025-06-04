import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import connectWallet from '../utils/ConnectWallet';
//import { loginUser } from '../../../../BackEnd/services/UserService';

const NO_SYMBOLS = [",", ".", "?", "|", `"`, "'", "="];
const VITE_SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

function hasForbiddenSymbol(value: string): boolean {
  return NO_SYMBOLS.some(sym => value.includes(sym));
}

function isLengthValid(value: string, min = 3, max = 50): boolean {
  return value.length >= min && value.length <= max;
}

function isFieldOK(value: string): boolean {
  return isLengthValid(value) && !hasForbiddenSymbol(value);
}
function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isPasswordValid(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}

function userOK(user: DatiUtente): boolean {
  const { username, password, email, role, name, city, address, serialCode, walletAddress } = user;

  // Tutti e tre i campi devono essere “OK”
  const allFieldsValid =
    isFieldOK(username) &&
    isFieldOK(role) &&
    isFieldOK(name) &&
    isFieldOK(city) &&
    isFieldOK(address) &&
    isFieldOK(serialCode) &&
    isFieldOK(walletAddress);

  if (!allFieldsValid) {
    alert("Valori proibiti: " + NO_SYMBOLS.join(", ") + "\n Lunghezza minima 3, Lunghezza massima 50");
    return false;
  }
  

  if(!isEmailValid(email)){
    alert("Email non valida: inserire un indirizzo email valido");
    return false;
  }

  if(!isPasswordValid(password)){
    alert("Password non valida: deve avere almeno 8 caratteri, almeno una lettera maiuscola, almeno una lettera minuscola e almeno un numero");
    return false;
  }

  return allFieldsValid;
}

interface DatiUtente {
  username: string;
  password: string;
  email: string;
  role: string;
  name: string;
  city: string;
  address: string;
  serialCode: string;
  walletAddress: string;
}

async function signUp(utente: DatiUtente): Promise<boolean> {
  const res = await fetch(`http://localhost:${VITE_SERVER_PORT}/api/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(utente),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error("Sign up failed: " + err.error);
  }

  const { success } = await res.json();
  return success;
}

function RegisterCardForm() {
  const [datiUtente, setDatiUtente] = useState<DatiUtente>({
    username: "",
    password: "",
    email: "",
    role: "",
    name: "",
    city: "",
    address: "",
    serialCode: "",
    walletAddress: ""
  })
  const [showModal, setShowModal] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();


  const buttonConnectWallet = async () => {
    const objPromise = connectWallet();
    setDatiUtente({
      ...datiUtente!,
      walletAddress: (await objPromise).address
    });
  }

  const handleInputChange = (name: string, e: string) => {
    setDatiUtente({
      ...datiUtente!,
      [name]: e
    });
  }

  const handleConfirmPassword = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(datiUtente.password !== confirmPassword){
      alert("Le password non corrispondono");
      return;
    }
    const currentUser = { ...datiUtente! };
    if (!userOK(currentUser)) {
      alert("Dati non validi")
      return;
    }
    try {
      setShowModal(true);
      const success = await signUp(currentUser);
      if (success) {
        setShowModal(false);
        alert("Registration successful");
        navigate("/");
      } else {
        setShowModal(false);
        alert("Sign up failed");
      }
    } catch (err) {
      console.error(err);
      setShowModal(false);
      alert("Errore durante la registrazione");
    }

  }

  return (
    <>
      <div className='m-5'>
        <button onClick={buttonConnectWallet}
          className="text-sm ms-50 border-2 font-bold py-1 px-1">
          Connect Wallet
        </button>
        <form className='grid border-3 rounded-lg p-4 m-4 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 '
          onSubmit={handleSubmit}>
          <input className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
            type="text"
            name="username"
            placeholder='username'
            value={datiUtente.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
          ></input>
          <input className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
            type="password"
            name="password"
            placeholder='password'
            value={datiUtente.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          ></input>
          <input className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
            type="password"
            name="confirmPassword"
            placeholder='ConfirmPassword'
            value={confirmPassword}
            onChange={(e) => handleConfirmPassword(e.target.value)}
          ></input>
          <input className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
            type="email"
            name="email"
            placeholder='email'
            value={datiUtente.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          ></input>
          <select className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
            name="role"
            value={datiUtente.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
          >
            <option value="" disabled>Select role</option>
            <option value="farmer">farmer</option>
            <option value="carrier">carrier</option>
            <option value="producer">producer</option>
            <option value="seller">seller</option>
          </select>
          <input className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
            type="text"
            name="name"
            placeholder='name'
            value={datiUtente.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          ></input>
          <input className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
            type="text"
            name="city"
            placeholder='city'
            value={datiUtente.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
          ></input>
          <input className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
            type="text"
            name="address"
            placeholder='address'
            value={datiUtente.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          ></input>
          <input className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
            type="text"
            name="serialCode"
            placeholder='serialCode'
            value={datiUtente.serialCode}
            onChange={(e) => handleInputChange("serialCode", e.target.value)}
          ></input>
          <input className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
            type="text" //Da modificare poi in password
            name="indirizzoWallet"
            placeholder='clickOnConnectWallet'
            value={datiUtente.walletAddress}
            onChange={(e) => handleInputChange("indirizzoWallet", e.target.value)}
            readOnly
          ></input>
          <button className="grid p-2 m-1 border-2 border-red-800 text-red-800 font-bold py-2 px-4 rounded-lg"
            type="submit"
            disabled={showModal}>
            Registration
          </button>
        </form>
        {showModal && (
          <div className="fixed p-5 inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-4 border-2 rounded-lg text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
              <p>Signing up...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default RegisterCardForm;    