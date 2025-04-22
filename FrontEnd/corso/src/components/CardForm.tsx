import { useState} from 'react';
import '../newIndex.css'

//const NO_SYMBOL = [",", ".", "?", "|", "\"", "'", "=", "&"]

function UserOK(user:{username:string, password:string, chiavePrivata:string}){
    /* const _reduced = (f,g) => (arg:{username:string, password:string, chiavePrivata:string}) => (g(f(arg)))
    const pipe = (...fns) => fns.reduce(_reduced)
    const userok = pipe(checkUsername, checkPassword, checkChiavePrivata)(user) */
    if((user.username.includes("")) ){
        return false
    }
    else
        return true
}


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
            return(
                alert("AUTENTICAZIONE RIUSCITA CHIAMATA AL BACKEND")
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