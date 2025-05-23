import logoSupplyChain from "./assets/logoSupplyChain.png"
import { useVerifyAuth } from "../hooks/useVerifyAuth";
import { Link } from "react-router-dom";
import Card from "./card";

/* async function listActors(nomeUtente: string) : Promise<User[]> {
  const res = await fetch(`http://localhost:${VITE_SERVER_PORT}/api/listActors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nomeUtente),
  });
  console.log(res)

  if (!res.ok) {
    const err = await res.json();
    throw new Error("Not found: " + err.error);
  }

  const {success} = await res.json();
  return success;
}  */

interface User {
  id: number;
  name: string;
  role: string;
  walletBalance: number;
}

export function FirstPage() {
  const { profile } = useVerifyAuth();

  if (!profile) {
    // finché non ho caricamento completo
    return <div>Loading profile…</div>;
  }

  const dati_attore: User[] = [{
    id: 1,
    name: "Attore 1",
    role: "Attore",
    walletBalance: 100,
  },
  {
    id: 2,
    name: "Attore 2",
    role: "Attore",
    walletBalance: 100,
  },];
  const handleCardClick = (item: User) => {
    // Store the selected item in sessionStorage.
    // Could be used to pass data to another page.
    sessionStorage.setItem("datiAttore", JSON.stringify(item));
  };


  return (
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
            <Card key={item.id} name={item.name} role={item.role} walletBalance={item.walletBalance} />
          </Link>
        ))}
      </div>
      <div className="grid grid-cols place-items-center-safe space-x-4 mt-8">
        <div className="flex place-items-center-safe">
          <h2 className="text-4xl text-red-800">Welcome:</h2>
          <p className="text-2xl">{profile.name}</p>
        </div>
        <div className="flex place-items-center-safe">
          <h2 className="text-4xl text-red-800">Role:</h2>
          <p className="text-2xl">{profile.role}</p>
        </div>
        <div className="flex place-items-center-safe">
          <h2 className="text-4xl text-red-800">City:</h2>
          <p className="text-2xl">{profile.city}</p>
        </div>
        <div className="flex place-items-center-safe">
          <h2 className="text-4xl text-red-800">Address:</h2>
          <p className="text-2xl">{profile.address}</p>
        </div>
        <div className="flex place-items-center-safe" >
          <h1 className="text-4xl text-red-800 ">
            Your wallet balance is:
          </h1>
          <h1 className="text-2xl  ">
            { }
          </h1>
        </div>
      </div>

    </div>
  )
}

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