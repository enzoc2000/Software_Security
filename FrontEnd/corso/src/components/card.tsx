
function Card(dati_attore:{name: string, crediti: string, CO2: string}){
    return(
        <>
            <div className="m-1 p-1 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <div className="flex flex-wrap ">
                    <h1 className="text-3xl  text-red-800 ">
                        Attore:
                    </h1>
                    <input 
                    className="text-3xl "
                    style={{fontFamily: 'sans-serif'}}
                    value = {dati_attore.name}>   
                    </input>
                </div>
                <div className="flex flex-wrap ">
                    <h1 className="text-2xl  text-red-800 ">
                        Crediti:
                    </h1>
                    <input
                    className="text-2xl "
                    style={{fontFamily: 'sans-serif'}}
                    value = {dati_attore.crediti}>
                    </input>
                </div>
                <div className="flex flex-wrap ">
                    <h1 className="text-2xl  text-red-800 ">
                        CO2:
                    </h1>
                    <input
                    className="text-2xl "
                    value= {dati_attore.CO2}>
                    </input>
                </div>
            </div>
        </>
    )
}
export default Card