
function Card(dati_attore:{name: string, crediti: number, CO2: number}){
    return(
        <>
            <div className=" m-1 p-1 border-3 rounded-lg text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <div className="flex flex-wrap ">
                    <h2 >
                        Attore: 
                    </h2>
                    <h2 className="text-red-800 ">
                        {dati_attore.name}  
                    </h2>
                </div>
                <div className="flex flex-wrap ">
                    <h2>
                        Crediti:
                    </h2>
                    <h2
                    className="text-red-800 ">
                        {dati_attore.crediti}
                    </h2>
                </div>
                <div className="flex flex-wrap ">
                    <h2>
                        CO2:
                    </h2>
                    <h2
                    className="text-red-800 ">
                        {dati_attore.CO2}
                    </h2>
                </div>
            </div>
        </>
    )
}
export default Card