import logoSupplyChain from "./assets/logoSupplyChain.png"
import Card from "./card"


//viene mostrata la pagina iniziale con il logo e il titolo dell'applicazione
//viene mostrata la card con i dati dell'attore che ha effettuato la chiamata
function FirstPage(dati_attore:{name: string, crediti: string, CO2: string}){
    return(
        <>
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <div className="flex flex-wrap place-items-center-safe">
                    <h1 className="text-3xl text-center text-red-800 ">
                        Sustainable Food Supply Chain
                    </h1>
                    <img 
                        className="" 
                        style={{height : '150px'}}
                        src={logoSupplyChain}>

                    </img>
                </div>
                <div className="grid ">
                    <Card
                        name={dati_attore.name}
                        crediti={dati_attore.crediti}
                        CO2={dati_attore.CO2}>
                    </Card>
                    <Card
                        name={dati_attore.name}
                        crediti={dati_attore.crediti}
                        CO2={dati_attore.CO2}>
                    </Card><Card
                        name={dati_attore.name}
                        crediti={dati_attore.crediti}
                        CO2={dati_attore.CO2}>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default FirstPage