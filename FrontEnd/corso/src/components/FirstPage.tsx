import logoSupplyChain from "./assets/logoSupplyChain.png"
import Card from "./card"

function FirstPage(dati_attore:{name: string, age: string, crediti: string, CO2: string}){
    return(
        <>
            <div >
                <div 
                    className="flex flex-wrap place-items-center-safe">
                    <h1 className="text-3xl text-center text-red-800 ">
                        Sustainable Food Supply Chain
                    </h1>
                    <img 
                        className="" 
                        style={{height : '150px'}}
                        src={logoSupplyChain}>

                    </img>
                </div>
                <div className="flex flex-wrap place-items-center-safe">
                    <Card>

                    </Card>
                </div>
            </div>
        </>
    )
}

export default FirstPage