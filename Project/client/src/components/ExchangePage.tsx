import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

export default function ExchangePage() {
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
      <h1>Dati Utente</h1>
      <p>Name: {datiUtente.name}</p>
      <p>Credits: {datiUtente.crediti}</p>
      <p>CO2 Emissions: {datiUtente.emissioni}</p>

      <h1>Dati Attore a cui inviare crediti</h1>
      <p>Name: {datiAttore.name}</p>
      <p>Credits: {datiAttore.crediti}</p>
      <p>CO2 Emissions: {datiAttore.emissioni}</p>
    </div>
  );
}