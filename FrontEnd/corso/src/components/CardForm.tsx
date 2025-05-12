import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
//import { loginUser } from '../../../../BackEnd/services/UserService';

const NO_SYMBOLS = [",", ".", "?", "|", `"`, "'", "=", "&"];

function hasForbiddenSymbol(value: string): boolean {
  return NO_SYMBOLS.some(sym => value.includes(sym));
}

function isLengthValid(value: string, min = 3, max = 20): boolean {
  return value.length >= min && value.length <= max;
}

function isFieldOK(value: string): boolean {
  return isLengthValid(value) && !hasForbiddenSymbol(value);
}
function userOK(user:{username:string, password:string, indirizzoWallet:string}): boolean {
    const { username, password, indirizzoWallet } = user;

  // Tutti e tre i campi devono essere “OK”
  const allFieldsValid =
    isFieldOK(username) &&
    isFieldOK(password) &&
    isFieldOK(indirizzoWallet);

  // E devono essere tutti distinti
  const allDistinct =
    username !== password &&
    username !== indirizzoWallet &&
    password !== indirizzoWallet;

  return allFieldsValid && allDistinct;
}

function CardForm() {
    const [users, setUser] = useState({
        username: "",
        password: "",
        indirizzoWallet: ""
    });

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const {name, value} = e.target;
        setUser({
            ...users,
            [name]: value
        });
    } 
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();  

        const currentUser = {...users};
        setUser({
            username: "",
            password: "",
            indirizzoWallet: ""
        });
        if(userOK(currentUser)){
            console.log("Utente: "+ currentUser.username +" OK")
            
            //Chiamata al backend (UserService) e autenticazione
            //Passo al backend un oggetto di tipo {username, password, indirizzoWallet}
            const utenteAutenticato = currentUser; //loginUser(users.username, users.password)
            //const utenteAutenticato = loginUser(users.username, users.password)

            //Il backend mi deve restituire un oggetto di tipo utente (JSON) con i dati dell'utente
            
            //I dati dell'utente sono: nome, crediti, CO2_emessa, ecc..

            navigate("/firstPage", {state: {user: utenteAutenticato}})
            //Passo alla pagina di FirstPage con i dati dell'utente autenticato             
        }
        else{
            alert("Dati non validi")
        }

    } 

    return (
        <>
            <form className='grid border-3 rounded-lg p-4 m-4 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 '
                onSubmit={handleSubmit}>
                <input className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
                    type="text" 
                    name="username" 
                    placeholder='username'
                    value={users.username}
                    onChange={handleInputChange}
                ></input>
                <input className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
                    type="password" 
                    name="password" 
                    placeholder='password'
                    value={users.password}
                    onChange={handleInputChange}
                ></input>
                <input className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
                    type="password" 
                    name="indirizzoWallet" 
                    placeholder='indirizzoWallet'
                    value={users.indirizzoWallet}
                    onChange={handleInputChange}
                ></input>
                <button className="grid p-2 m-1 border-2 border-red-800 text-red-800 font-bold py-2 px-4 rounded-lg hover:bg-red-700"
                    type="submit">
                    Login
                </button>            
            </form>
        </>
    );
}

export default CardForm;    