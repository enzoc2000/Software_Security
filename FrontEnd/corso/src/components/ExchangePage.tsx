import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { submitEmission } from "../../../../BackEnd/Services/DataService"
import { useState } from "react";
import Modal from "./Modal";
function ExchangePage() {

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
        <h1 className="text-5xl text-red-800 ">
            {`Seleziona l'attore con cui vuoi scambiare i crediti!`}
        </h1>
        <Modal/>
    </div>
  );
}

export default ExchangePage;