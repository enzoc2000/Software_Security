
export function Card(actorData:{name: string, role: string, email: string, walletBalance: number}){
    return(
        <>
            <div className="grid grid-cols-4 text-black border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <div className="flex flex-wrap p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    <h2 className="ml-2 font-bold" >
                        {actorData.name}
                    </h2>
                </div>
                <div className="flex flex-wrap p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    <h2 className="ml-2 font-bold" >
                        {actorData.role}
                    </h2>
                </div>
                <div className="flex flex-wrap p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    <h2 className="ml-2 font-bold" >
                        {actorData.email}
                    </h2>
                </div>
                <div className="flex flex-wrap p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    <h2 className="ml-2 font-bold" >
                        {actorData.walletBalance}
                    </h2>
                </div>
            </div>
        </>
    )
}