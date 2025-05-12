import './App.css'
import Card from './components/Card';
import Example from './components/Example'
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';

function App() {
  const users = useSelector((state: any) => state.users.value);
  const count = useSelector((state: any) => state.counter.value);
  return (
    <>  
      <Navbar />
      <Example /> 
      <div className='grid'>
        {users.map((item: {id: number, name: string, crediti: string, emissioni: string}) => (
          <Card 
            key={item.id}
            name= {item.name}
            crediti= {item.crediti}
            CO2= {item.emissioni}>
          </Card>
        ))}
      </div> 
    </>
  );
}

export default App
