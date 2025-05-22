import logoSupplyChain from "./assets/logoSupplyChain.png"
import Card from "./Card"
import { useSelector } from "react-redux"
import { Link, useLocation} from "react-router-dom";

/* interface DatiUtente {
  username: string;
  role: string;
  name: string;
  city: string;
  address: string;
} */

interface User {
  id: number;
  name: string;
  emissions: number;
  credits: number;
}


interface LocationState {
  user: { _id: number;
    _username: string;
    passwordHash: string;
    //(Azienda trasportatrice, agricola, rivenditore, ecc.)
    _role: string;
    _name: string;
    _city: string;
    _address: string;
    //Facoltativo in attesa di capire come gestirlo (se presente o meno in fase di registrazione)
    _wallet?: {
      _userId: number;
      _address: string;
      _balance: number;
    };
  }
}


/* async function listaActors(nomeUtente: string) : Promise<User[]> {
  const res = await fetch("http://localhost:3010/api/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nomeUtente),
  });
  console.log(res)

  if (!res.ok) {
    const err = await res.json();
    throw new Error("Sign up failed: " + err.error);
  }

  const {success} = await res.json();
  return success;
} */

//viene mostrata la pagina iniziale con il logo e il titolo dell'applicazione
//viene mostrata la card con i dati dell'attore che ha effettuato la chiamata
function FirstPage(){

  // Assuming the "users" slice returns an array of User objects.
  const dati_attore: User[] = useSelector((state: { users: { value: User[]; }; }) => state.users.value);

  const location = useLocation()

  const state = location.state as LocationState;

  //const utente = state.user;


  //check(utente)
  // Tenere traccia dell'andamento dell'utente all'interno dell'app 
  // Fare bottone di logout per eliminare i dati dell'utente
  
  //const listaAttori: User[] = listaActors(utente._username)


  // Example state for a single User. Adjust initial values as needed.
  /* const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    emissions: 0,
    credits: 0
  }); */
  

  if (!state ) {
    return <p>Errore: dati utente non disponibili.</p>;
  }



  //const dispatch = useDispatch()


    // Function to store the selected item in sessionStorage.
    const handleCardClick = (item: User) => {
    // Store the selected item in sessionStorage.
    // Could be used to pass data to another page.
      sessionStorage.setItem("dati_utente", JSON.stringify(item));
      sessionStorage.setItem("dati_attore", JSON.stringify(item));
};

    return(
        <div className="flex flex-col h-screen w-screen " >
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
            <div className="flex flex-wrap w-screen place-items-center" >
                {dati_attore.map((item: User) => (
                <Link
                    to={`/ExchangePage/${item.id}`}
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    >
                    <Card key={item.id} name={item.name} crediti={item.credits} CO2={item.emissions}/>
                </Link>
            ))}
            </div>
            <div className="flex place-items-center-safe" >
                <h1 className="text-5xl text-red-800 ">
                    Welcome : 
                </h1>
                <h1 className="text-5xl  ">
                    {state.user._username} 
                </h1>
            </div>
            <div className="flex place-items-center-safe" >
                <h1 className="text-5xl text-red-800 ">
                    Your role is the: 
                </h1>
                <h1 className="text-5xl  ">
                    {state.user._role}
                </h1>
            </div>
            <div className="flex place-items-center-safe" >
                <h1 className="text-5xl text-red-800 ">
                    Your city is: 
                </h1>
                <h1 className="text-5xl  ">
                    {state.user._city}
                </h1>
            </div>
            <div className="flex place-items-center-safe" >
                <h1 className="text-5xl text-red-800 ">
                    Your address is: 
                </h1>
                <h1 className="text-5xl  ">
                    {state.user._address}
                </h1>
            </div>
            <div className="flex place-items-center-safe" >
                <h1 className="text-5xl text-red-800 ">
                    Your wallet balance is: 
                </h1>
                <h1 className="text-5xl  ">
                    {state.user._wallet?._balance}
                </h1>
            </div>
        </div>
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