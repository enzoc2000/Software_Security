import { X } from 'lucide-react';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Modal(/* { isOpen, onClose, children } */) {
  //if (!isOpen) return null;
  const { idAttore } = useParams();

    const attore = useSelector((state: { users: { value: { id: string; name: string; crediti: number; emissioni: string; }[]; }; }) => 
        state.users.value.filter((actor) => actor.id == idAttore?.toString())
    )

    const [credits, setCredits] = useState({
        crediti: 0,
    })

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (credits.crediti <= 0  || attore[0].crediti < credits.crediti ) {
            alert("Inviare un numero di crediti maggiore di 0 e minore dei crediti disponibili")
            return
        }
        //send token to another user
        console.log("Crediti inviati: ", credits.crediti)
    }
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const creditsToSend  = parseInt(e.target.value, 10) || 0;
        setCredits({
            crediti: creditsToSend
        });
    } 

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
      <div className='mt-10 flex flex-col gap-5'>
        <button className='place-self-end'>
          <X size={30} />
        </button>
        <div className='flex flex-col gap-5 bg-white rounded-lg p-5'>
            <h1 className="text-5xl">Vuoi inviare crediti a 
                <text className="text-red-800"> {attore[0].name} </text>
                ?
            </h1>
            <h2>Di seguito i dati di {attore[0].name}</h2>
            <h1>Crediti: 
                <text className="text-red-800">{attore[0].crediti}</text>
            </h1>
            <input className="flex-1/12 text-red-800 border-1 border-red-800 rounded-lg p-1 m-1"
            type="number"
            min="0"
            max={attore[0].crediti}
            name="crediti"
            placeholder="inserisci crediti"
            onChange={(e) => {handleInputChange(e)}}>
            </input>
            <button className="bg-red-800 text-white border-2 border-black rounded-lg "
            type="submit"
            onClick={(e) => {handleSubmit(e)}}>
                Invia Crediti
            </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;