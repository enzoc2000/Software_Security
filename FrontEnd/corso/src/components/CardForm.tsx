import { useState} from 'react';
import '../newIndex.css'
import { Link } from 'react-router-dom';

//const NO_SYMBOL = [",", ".", "?", "|", "\"", "'", "=", "&"]

function UserOK(user:{username:string, password:string, chiavePrivata:string}): boolean {
     if((user.username.includes(",") || user.username.includes(".") || user.username.includes("?") || user.username.includes("\"") || user.username.includes("'") || user.username.includes("=") || user.username.includes("&&") || user.username.includes("||") || user.username.includes("||"))) {
        return false
    }
    else
        return true
}

/* const _reduced = (f,g) => (arg:{username:string, password:string, chiavePrivata:string}) => (g(f(arg)))
    const pipe = (...fns) => fns.reduce(_reduced)
    const userok = pipe(checkUsername, checkPassword, checkChiavePrivata)(user) */
   


function CardForm() {
    const [users, setUser] = useState({
        username: "",
        password: "",
        chiavePrivata: ""
    });

     
    const handleInputChange = (e)=> {
        const {name, value} = e.target;
        const inputValue =  value;
        setUser({
            ...users,
            [name]: inputValue
        });
    } 
    

    const handleSubmit = (e) => {
        e.preventDefault();  
        setUser({
            username: "",
            password: "",
            chiavePrivata: ""
        });
        if(UserOK(users)){
            //Chiamata al backend (UserService) e autenticazione
            //Passo al backend un oggetto di tipo {username, password, chiavePrivata}
            //Il backend mi deve restituire un oggetto di tipo utente (JSON) con i dati dell'utente
            //I dati dell'utente sono: nome, crediti, CO2_emessa, ecc..
            //Questi dati vengono passati alla First Page
            return(
                <Link to= {"/firstPage"}  >
                </Link>
                // UserService mi ritorna un oggetto di tipo utente (JSON) con i dati dell'utente
            )
        }
        else{
            return(
                alert("AUTENTICAZIONE FALLITA")
            )
        }

    } 

    return (
        <>
            <form className=' border-2 border-blue-800 rounded-lg p-4 m-4 '
                onSubmit={handleSubmit}>
                <div >
                    <input 
                    className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
                    type="text" 
                    name="username" 
                    placeholder='username'
                    value={users.username}
                    onChange={handleInputChange}
                    ></input>
                </div>
                <div >
                    <input 
                    className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
                    type="password" 
                    name="password" 
                    placeholder='password'
                    value={users.password}
                    onChange={handleInputChange}
                    ></input>
                </div>
                <div >
                    <input 
                    className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
                    type="password" 
                    name="chiavePrivata" 
                    placeholder='chiavePrivata'
                    value={users.chiavePrivata}
                    onChange={handleInputChange}
                    ></input>
                </div >
                <div className='pl-13 pt-2'>
                    <button className='text-white border-2 border-black bg-red-800 rounded-lg '
                    type="submit"
                    >Login</button>
                </div>
            </form>
        </>
    );
}

export default CardForm;    