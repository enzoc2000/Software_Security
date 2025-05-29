
export function Card(actorData:{name: string, role: string, walletBalance: number}){
    return(
        <>
            <div className=" m-2 p-2 border-3 rounded-lg text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <div className="flex flex-wrap ">
                    <h2 >
                        Actor name: 
                    </h2>
                    <h2 className="font-bold text-red-800 ">
                        {actorData.name}  
                    </h2>
                </div>
                <div className="flex flex-wrap ">
                    <h2>
                        Role:
                    </h2>
                    <h2 className="font-bold text-red-800 ">
                        {actorData.role}
                    </h2>
                </div>
                <div className="flex flex-wrap ">
                    <h2>
                        Wallet Balance:
                    </h2>
                    <h2 className="font-bold text-red-800 ">
                        {actorData.walletBalance}
                    </h2>
                </div>
            </div>
        </>
    )
}