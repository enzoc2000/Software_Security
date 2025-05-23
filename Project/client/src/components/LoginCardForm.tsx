import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import connectWallet from '../utils/ConnectWallet';
import { useAuth } from '../hooks/useAuth';
const NO_SYMBOLS = [",", ".", "?", "|", `"`, "'", "=", "&"];
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
function userOK(user:{username:string, password:string, walletAddress:string}): boolean {
  const { username, password, walletAddress } = user;

  // Tutti e tre i campi devono essere “OK”
  const allFieldsValid =
    isFieldOK(username) &&
    isFieldOK(password) &&
    isFieldOK(walletAddress);

  // E devono essere tutti distinti
  const allDistinct =
    username !== password &&
    username !== walletAddress &&
    password !== walletAddress;

  return allFieldsValid && allDistinct;
}

interface Utente {
  username: string;
  password: string;
  walletAddress: string;
}

interface utenteAutenticato {
  id: number;
  username: string;
  password: string;
  role: string;
  name: string;
  city: string;
  address: string;
}

async function loginApi(utente: Utente) : Promise<{utenteAutenticato: utenteAutenticato, token: string}> {
  const res = await fetch(`http://localhost:${VITE_SERVER_PORT}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(utente),
  });
  console.log(res)
  if (!res.ok) {
    const err = await res.json();
    throw new Error("Login failed: " + err.error);
  }

  const data = await res.json();
  return data;
}


function LoginCardForm() {
    const [datiUtente, setDatiUtente] = useState<Utente>({
        username: "",
        password: "",
        walletAddress: ""
    })
    
    const navigate = useNavigate();
    const { login } = useAuth();

    
    const buttonConnectWallet = async () => {    
        const objPromise = connectWallet();
        setDatiUtente({
            ...datiUtente!,
            walletAddress: (await objPromise).address
        });
    }

    const handleInputChange = (name: string, e: string)=> {
        setDatiUtente({
            ...datiUtente!,
            [name]: e
        });
    } 
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();  
        const currentUser = {...datiUtente}
        setDatiUtente({
          username: "",
          password: "",
          walletAddress: ""
        });
        
        if(userOK(currentUser)){
            console.log("Utente: "+ currentUser.username +" OK")
            
            try {
            //Chiamata al backend (UserService) e autenticazione
            const {utenteAutenticato, token} = await loginApi(datiUtente);
            //I dati dell'utente sono: nome, crediti, CO2_emessa, ecc..            //const utenteLinkato = await linkWallet(strutturaWallet.userId, strutturaWallet);

            login(token, utenteAutenticato);

            //Passo alla pagina di FirstPage con i dati dell'utente autenticato 
            navigate("/firstPage");   

            } catch (error) {
              alert("Login fallito: " + error);
            }         
        }
        else{
            alert("Dati non validi")
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
                      type="text" 
                      name="walletAddress" 
                      placeholder='clickOnConnectWallet'
                      value={datiUtente.walletAddress}
                      onChange={(e) => handleInputChange("walletAddress", e.target.value)}
                      readOnly
                  ></input>
                  <button className="grid p-2 m-1 border-2 border-red-800 text-red-800 font-bold py-2 px-4 rounded-lg"
                      type="submit">
                      Login
                  </button>   
                </form>         
            </div>
        </>
    );
}

export default LoginCardForm;    