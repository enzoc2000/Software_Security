import { useState } from "react";
import logoSupplyChain from "./assets/logoSupplyChain.png"
import Card from "./card"
import { useSelector } from "react-redux"
import { Link} from "react-router-dom";

interface User {
  id: number;
  name: string;
  crediti: number;
  emissioni: number;
}

//viene mostrata la pagina iniziale con il logo e il titolo dell'applicazione
//viene mostrata la card con i dati dell'attore che ha effettuato la chiamata
function FirstPage(){
    /* const{ usernameAttore } = useParams();

    const attore = useSelector((state: { user: { value: { id: string; name: string; crediti: number; emissioni: number; }[]; }; }) =>
        state.user.value.filter((actor) => actor.name == usernameAttore?.toString())
    ) */

      // Assuming the "users" slice returns an array of User objects.
    const dati_attore: User[] = useSelector((state: any) => state.users.value);

    // Example state for a single User. Adjust initial values as needed.
    const [user, setUser] = useState<User>({
        id: 0,
        name: "",
        crediti: 0,
        emissioni: 0,
    });

    //const dispatch = useDispatch()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        });
    } 

    // Function to store the selected item in sessionStorage.
    const handleCardClick = (item: User) => {
    // Store the selected item in sessionStorage.
    // Could be used to pass data to another page.
      sessionStorage.setItem("dati_utente", JSON.stringify(item));
      sessionStorage.setItem("dati_attore", JSON.stringify(item));
};

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
                {dati_attore.map((item: User) => (
                <Link
                    to={`/ExchangePage/${item.id}`}
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    >
                    <Card key={item.id} name={item.name} crediti={item.crediti} CO2={item.emissioni} />
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
                    value={user.name}
                    onChange={handleInputChange}
                ></input>
            </div>
        </>
    )
}

export default FirstPage


/*
function FirstPage() {
  // Assuming the "users" slice returns an array of User objects.
  const dati_attore: User[] = useSelector((state: any) => state.users.value);

  // Example state for a single User. Adjust initial values as needed.
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    crediti: "",
    emissioni: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Function to store the selected item in sessionStorage.
  const handleCardClick = (item: User) => {
    // Store the selected item in sessionStorage.
    // Could be used to pass data to another page.
      sessionStorage.setItem("dati_utente", JSON.stringify(item));
      sessionStorage.setItem("dati_attore", JSON.stringify(item));
};

  return (
    <div>
      <img src={logoSupplyChain} alt="Supply Chain Logo" />
      {dati_attore.map((item: User) => (
        <Link
          to={`/ExchangePage/${item.id}`}
          key={item.id}
          onClick={() => handleCardClick(item)}
        >
          <Card key={item.id} name={item.name} crediti={item.crediti} CO2={item.emissioni} />
        </Link>
      ))}
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
    </div>
  );
}

export default FirstPage; */