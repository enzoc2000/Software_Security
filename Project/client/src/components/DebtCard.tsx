import { UserDebtDTO } from "../Models/UserDebtDTO";

export function DebtCard(actorDebtData: UserDebtDTO){
    return(
        <>
            <div className=" m-1 p-1 border-3 rounded-lg text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <div className="flex flex-wrap ">
                    <h2 >
                        Actor name: 
                    </h2>
                    <h2 className="font-bold text-red-800 ">
                        {actorDebtData.name}  
                    </h2>
                </div>
                <div className="flex flex-wrap ">
                    <h2>
                        Role:
                    </h2>
                    <h2 className="font-bold text-red-800 ">
                        {actorDebtData.role}
                    </h2>
                </div>
                <div className="flex flex-wrap ">
                    <h2>
                        Debt:
                    </h2>
                    <h2 className="font-bold text-red-800 ">
                        {actorDebtData.debt}
                    </h2>
                </div>
            </div>
        </>
    )
}