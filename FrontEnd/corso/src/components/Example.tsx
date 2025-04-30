import{ useContext } from 'react';
import { ProvaContext } from '../stores/ProvaContext';

function Example() {
    const provaContext = useContext(ProvaContext);
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <p>Conteggio : {provaContext.count}</p>
            <button onClick={() => provaContext.setCount(provaContext.count + 1)} className='button'>
                Incrementa
            </button>
        </div>
    );
}

export default Example;