import { useState } from "react";
import logoSupplyChain from "./assets/logoSupplyChain.png"
import Card from "./Card"
import { useSelector } from "react-redux"
import { Link, useLocation} from "react-router-dom";

interface User {
  id: number;
  name: string;
  credits: number;
  emissions: number;
}


interface LocationState {
  user: {
    nome: string,
    crediti: number,
    emissioni: number
  };
}

//viene mostrata la pagina iniziale con il logo e il titolo dell'applicazione
//viene mostrata la card con i dati dell'attore che ha effettuato la chiamata
function FirstPage(){

  // Assuming the "users" slice returns an array of User objects.
  const dati_attore: User[] = useSelector((state: { users: { value: User[]; }; }) => state.users.value);

  const location = useLocation()

  const state = location.state as LocationState || { user: { id: 0, name: "", crediti: 0, emissioni: 0 } };
      
  const { nome, crediti, emissioni } = state.user

  const utente = state.user;
  // Example state for a single User. Adjust initial values as needed.
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    emissions: 0,
    credits: 0
  });
  

  if (!state || !state.user) {
    return <p>Errore: dati utente non disponibili.</p>;
  }



  console.log(utente);
  

  //const dispatch = useDispatch()


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
                    <Card key={item.id} name={item.name} crediti={item.credits} CO2={item.emissions}/>
                </Link>
            ))}
            </div>
            <div className="flex place-items-center-safe" >
                <h1 className="text-5xl text-red-800 ">
                    Welcome: 
                </h1>
                <h1 className="text-5xl  ">
                    {nome}
                </h1>
            </div>
            <div className="flex place-items-center-safe" >
                <h1 className="text-5xl text-red-800 ">
                    Your average CO2 emissions are: 
                </h1>
                <h1 className="text-5xl  ">
                    {emissioni}
                </h1>
            </div>
            <div className="flex place-items-center-safe" >
                <h1 className="text-5xl text-red-800 ">
                    Your credits are: 
                </h1>
                <h1 className="text-5xl  ">
                    {crediti}
                </h1>
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