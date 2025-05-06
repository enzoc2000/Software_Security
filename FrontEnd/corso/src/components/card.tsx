
function Card(dati_attore:{name: string, crediti: string, CO2: string}){
    return(
        <>
            <div className="grid grid-cols-3 m-1 p-1 border-2 rounded-lg border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <div className="flex flex-wrap ">
                    <h1 className="text-3xl  text-red-800 ">
                        Attore:
                    </h1>
                    <text 
                    className="text-3xl "
                    style={{fontFamily: 'sans-serif'}}>
                        {dati_attore.name}  
                    </text>
                </div>
                <div className="flex flex-wrap ">
                    <h1 className="text-2xl  text-red-800 ">
                        Crediti:
                    </h1>
                    <text
                    className="text-2xl "
                    style={{fontFamily: 'sans-serif'}}>
                        {dati_attore.crediti}
                    </text>
                </div>
                <div className="flex flex-wrap ">
                    <h1 className="text-2xl  text-red-800 ">
                        CO2:
                    </h1>
                    <text
                    className="text-2xl ">
                        {dati_attore.CO2}
                    </text>
                </div>
            </div>
        </>
    )
}
export default Card