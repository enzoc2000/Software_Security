import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import Modal from "./Modal";

interface DatiUtente {
  name: string;
  crediti: string;
  emissioni: string;
}

interface DatiAttore {
  name: string;
  crediti: string;
  emissioni: string;
}
export function ExchangePage() {
    const { id } = useParams<{ id: string }>();

    const [datiUtente, setDatiUtente] = useState<DatiUtente | null>(null);
    const [datiAttore, setDatiAttore] = useState<DatiAttore | null>(null);

    useEffect(() => {
    const storedUtente = sessionStorage.getItem("dati_utente");
    const storedAttore = sessionStorage.getItem("dati_attore");

    if (storedUtente && storedAttore) {
      setDatiUtente(JSON.parse(storedUtente) as DatiUtente);
      setDatiAttore(JSON.parse(storedAttore) as DatiAttore);
    }
  }, [id]);

  if (!datiUtente || !datiAttore) {
    return <div>No data found.</div>;
  }
    return (
    <div>      
        <h1 className="text-5xl text-red-800 ">
            Exchange Page
        </h1>
        <h1 className="text-5xl text-red-800 ">
            {`Benvenuto nella pagina di scambio dei crediti!`}
        </h1>
        <h1 className="text-5xl text-red-800 ">
            {`Qui puoi scambiare i tuoi crediti con altri attori!`}
        </h1>
        <h1>Dati Utente</h1>
        <p>Name: {datiUtente.name}</p>
        <p>Credits: {datiUtente.crediti}</p>
        <p>CO2 Emissions: {datiUtente.emissioni}</p>

        <h1>Dati Attore a cui inviare crediti</h1>
        <p>Name: {datiAttore.name}</p>
        <p>Credits: {datiAttore.crediti}</p>
        <p>CO2 Emissions: {datiAttore.emissioni}</p>
        {/* <Modal/> */}
    </div>
  );
}
