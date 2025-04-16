import { useState} from 'react';
import './card.css'

function CardForm({aggiungiSoftware}) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        img: "",
        isUsed: false
    });

    
    const handleInputChange = (e)=> {
        const {name, value, type, checked} = e.target;
        const inputValue = type === "checkbox" ? checked : value;
        setFormData({
            ...formData,
            [name]: inputValue
        });
    }




    const handleSubmit = (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        const software = {
            id: Math.random(),
            title: formData.title,
            description: formData.description,
            img: formData.img,
            isUsed: formData.isUsed
        }
        setFormData ({
            title: "",
            description: "",
            img: "",
            isUsed: false
        });
        aggiungiSoftware(software)
    } 

    return (
        <>
            <form onSubmit={handleSubmit} className='stile-card-vuota' >
                <div className="flex">
                    <label>Titolo</label>
                    <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleInputChange}></input>
                </div>
                <div className="flex">
                    <label>Descrizione</label>
                    <textarea 
                    name="description" 
                    value={formData.description}
                    onChange={handleInputChange}></textarea>
                </div>
                <div className="flex ">
                    <label>Immagine</label>
                    <input 
                    type="text" 
                    name="img" 
                    value={formData.img}
                    onChange={handleInputChange}></input>
                </div>
                <div className="flex">
                    <label>Usato?</label>
                    <input 
                    type="checkbox" 
                    name="isUsed" 
                    checked={formData.isUsed}
                    onChange={handleInputChange}></input>
                </div>
                <button className='stile-card-vuota' 
                type="submit"
                >Aggiungi Card</button>
            </form>
            <form className='stile-card-vuota'
                onSubmit={handleSubmit}>
                <div className="flex">
                    <input 
                    type="text" 
                    name="Username" 
                    placeholder='Username'
                    value={formData.title} 
                    onChange={handleInputChange}></input>
                </div>
                <div className="flex">
                    <input 
                    type="text" 
                    name="Password" 
                    placeholder='Password'
                    value={formData.description} 
                    onChange={handleInputChange}></input>
                </div>
                <div className="flex">
                    <input 
                    type="text" 
                    name="ChiavePrivata" 
                    placeholder='ChiavePrivata'
                    value={formData.img} 
                    onChange={handleInputChange}></input>
                </div>
                <button className='stile-card-vuota'
                type="submit"
                >Login</button>
            </form>
        </>
    );
}

export default CardForm;    