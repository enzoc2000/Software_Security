import { TransactionDTO } from "../Models/TransactionDTO";

export function TransactionCard(transaction: TransactionDTO) {
    const emissionobj = new Date(transaction.timestamp);
    const data = emissionobj.toLocaleString('it-IT', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
    });

    return (
        <>
            <div className="grid grid-cols-6 text-black text-sm border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <div className="flex flex-wrap p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    <h2 className="ml-2 font-bold" >
                        {data}
                    </h2>
                </div>
                <div className="flex flex-wrap p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    <h2 className="ml-2 font-bold" >
                        {transaction.senderName}
                    </h2>
                </div>
                <div className="flex flex-wrap p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    <h2 className="ml-2 font-bold" >
                        {transaction.senderRole}
                    </h2>
                </div>
                <div className="flex flex-wrap p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    <h2 className="ml-2 font-bold" >
                        {transaction.receiverName}
                    </h2>
                </div>
                <div className="flex flex-wrap p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    <h2 className="ml-2 font-bold" >
                        {transaction.receiverRole}
                    </h2>
                </div>
                <div className="flex flex-wrap p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    <h2 className="ml-2 font-bold" >
                        {transaction.amount}
                    </h2>
                </div>
            </div>
        </>

    );
}