import { TransactionDTO } from "../Models/TransactionDTO";

export function TransactionCard(transaction: TransactionDTO) {
    const emissionobj = new Date(transaction.timestamp);
    const data = emissionobj.toLocaleString('it-IT', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
    });

    return (
        <>
            <div className="flex m-2 border-2 rounded-lg text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <div className="flex flex-wrap p-2 border-2  border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    <h2>
                        Date:
                    </h2>
                    <h2 className="ml-2 font-bold" >
                        {data}
                    </h2>
                </div>
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                    <h2>
                        Sender:
                    </h2>
                    <h2 className="ml-2 font-bold">
                        {transaction.senderUserId}
                    </h2>
                </div>
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                    <h2>
                        Receiver:
                    </h2>
                    <h2 className="ml-2 font-bold" >
                        {transaction.receiverUserId}
                    </h2>
                </div>
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                    <h2>
                        Amount sended:
                    </h2 >
                    <h2 className="ml-2 font-bold">
                        {transaction.amount}
                    </h2>
                </div>
            </div>
        </>

    );
}