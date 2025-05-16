import { useState } from "react";
import logoSupplyChain from "./assets/logoSupplyChain.png"
import Card from "./card"
import { useSelector, useDispatch } from "react-redux"
import {addUser} from "../redux/usersSlice"
import { Link, useParams } from "react-router-dom";
//viene mostrata la pagina iniziale con il logo e il titolo dell'applicazione
//viene mostrata la card con i dati dell'attore che ha effettuato la chiamata
function FirstPage(){
    /* const{ usernameAttore } = useParams();

    const attore = useSelector((state: { user: { value: { id: string; name: string; crediti: number; emissioni: number; }[]; }; }) =>
        state.user.value.filter((actor) => actor.name == usernameAttore?.toString())
    ) */
    const dati_attore = useSelector((state: { users: { value: { id: number; name: string; crediti: number; emissioni: number; }[]; }; }) => state.users.value);
    
    const [users, setUser] = useState({
        name: ""
    })

    const dispatch = useDispatch()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const {name, value} = e.target;
        setUser({
            ...users,
            [name]: value
        });
    } 

    return(
        <>
            <div className="flex flex-col place-items-center-safe" >
                <h1 className="text-5xl text-red-800 ">
                        Sustainable Food Supply Chain
                </h1>
                <img 
                    className="w-auto"
                    src={logoSupplyChain}
                    alt="logo">
                </img>
            </div>
            <div className="flex flex-wrap place-items-center-safe" >
            {dati_attore.map((item: {id: number, name: string, crediti: number, emissioni: number}) => (
                <Link to={`/ExchangePage/${item.id}`}key={item.id}>
                    <Card 
                    key={item.id}
                    name= {item.name}
                    crediti= {item.crediti}
                    CO2= {item.emissioni}
                    >
                    </Card>
                </Link>
                ))}
            </div>
            <div className="flex place-items-center-safe" >
                <h1 className="text-5xl text-red-800 ">
                    Welcome: 
                </h1>
                <h1 className="text-5xl  ">
                    {dati_attore[0].name}
                </h1>
            </div>
            <div className="flex place-items-center-safe" >
                <h1 className="text-5xl text-red-800 ">
                    Your average CO2 emissions are: 
                </h1>
                <h1 className="text-5xl  ">
                    {dati_attore[0].emissioni}
                </h1>
            </div>
            <div className="flex place-items-center-safe" >
                <h1 className="text-5xl text-red-800 ">
                    Your credits are: 
                </h1>
                <h1 className="text-5xl  ">
                    {dati_attore[0].crediti}
                </h1>
            </div>
            <div className="flex place-items-center-safe" >
                <input 
                    className='text-red-800 border-1 border-red-800 rounded-lg p-1 m-1'
                    type="text" 
                    name="name" 
                    placeholder='actor name'
                    value={users.name}
                    onChange={handleInputChange}
                ></input>
                <button 
                    className="border-2 border-red-800 bg-blue-800 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        dispatch(addUser(users.name))
                        setUser({
                            name: ""
                        })
                        console.log(users.name)
                        console.log(dati_attore)
                    }
                    }>
                    Add User
                </button>
            </div>
        </>
    )
}

export default FirstPage