import{ useEffect, useState } from 'react';

function Example() {
    const[count, setCount] = useState(0);
    
    // Update the document title when title or description changes
    // useEffect is a hook that allows you to perform side effects in function components
    useEffect(() => {
        localStorage.setItem("count", count.toString());
        document.title = 'Conteggio: ' + count;
        console.log("Title changed to: ", document.title);
    }, [count]);

    return (
        <div>
            <p>Chiamata api</p>
            <button onClick={() => setCount((count) => count + 1)} className='button'>
                count in {count}
            </button>
        </div>
    );
}

export default Example;