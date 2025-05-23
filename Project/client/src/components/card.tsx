
function Card(dati_attore:{name: string, role: string, walletBalance: number}){
    return(
        <>
            <div className=" m-1 p-1 border-3 rounded-lg text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <div className="flex flex-wrap ">
                    <h2 >
                        Actor name: 
                    </h2>
                    <h2 className="text-red-800 ">
                        {dati_attore.name}  
                    </h2>
                </div>
                <div className="flex flex-wrap ">
                    <h2>
                        Role:
                    </h2>
                    <h2 className="text-red-800 ">
                        {dati_attore.role}
                    </h2>
                </div>
                <div className="flex flex-wrap ">
                    <h2>
                        Wallet Balance:
                    </h2>
                    <h2 className="text-red-800 ">
                        {dati_attore.walletBalance}
                    </h2>
                </div>
            </div>
        </>
    )
}
export default Card