import reactLogo from './assets/react.svg'
import './App.css'
import { useState, useEffect } from 'react'
import Example from './components/Example'
import { ProvaContext } from './stores/ProvaContext';


/* function handleClick() {
  alert("Hello World");
}

function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  console.log(e.target.value);
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  console.log(e);
  e.preventDefault();
} */

function App() {
  const [count, setCount] = useState(0);
  /*const [items, setItems] = useState([1,2,3,4,5]);
  const [user, setUser] = useState({ name: "Matteo", age: 27 });
  

  const aggiungiItem = () => {
    const nuovoItem = 8;
    setItems([...items, nuovoItem]);
    console.log(items);
  }

  const updateUserName = () => {
    const updateUser = { ...user, name: "Marco" };
    setUser(updateUser);
  } */
/* 
     const[data, setData] = useState([]);
 
     useEffect(() => {
         fetch('https://jsonplaceholder.typicode.com/posts')
             .then((response) => response.json())
             .then((data) => {
                 setData(data)
                 console.log(data);
             });
     }
     , []);
 
     

  const [softwares, setSoftwares] = useState([
    {
      id: 0,
      title: "Vite",
      img: "./vite.svg",
      isUsed: true,
      description: "Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts:"
    },
    {
      id: 1,
      title: "React",
      img: reactLogo,
      isUsed: false,
      description: "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications."
    },
    {
      id: 2,
      title: "Supply Chain",
      img: supplyChainLogo,
      isUsed: true,
      description: "Supply Chain is a system of organizations, people, activities, information, and resources involved in supplying a product or service to a consumer."
    }
  ]);

   /* const addSoftware = (software: {id: number, title: string, img: string, isUsed: boolean, description: string}) => {
    setSoftwares([...softwares, software]);
  } */ 

  return (
    <ProvaContext.Provider value={{ count , setCount }}>  
      <Example />
      {/* <CardForm 
      aggiungiSoftware={addSoftware}>
      </CardForm>
      <div className='grid'>
        {softwares.map((software) => (
          <Card
            key={software.id}
            isUsed={software.isUsed}
            title={software.title}
            img={software.img}
            >
              {software.description}
          </Card>
        ))}
      </div>
      <div className='grid'>
        {data.map((item) => (
          <div key={item.id} className='stile-card'>
            <h1> userid : {item.userId}</h1>
            <p>{item.title}</p>  
            <p>{item.body}</p>
          </div>
        ))}
      </div> */}
      {/* <div>
        <button onClick={() => setCount((count) => count + 1)} className='button'>
          count in {count}
        </button>
        <button onClick={() => aggiungiItem()} className='button'>
          press me
        </button>
      </div> */}
    </ProvaContext.Provider>
  );
}

export default App
