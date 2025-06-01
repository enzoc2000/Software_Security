import { useNavigate } from "react-router-dom";
import { useVerifyAuth } from "../hooks/useVerifyAuth";
import { useVerifyTransactions } from "../hooks/useVerifyTransactions";
import { TransactionDTO } from "../../../server/src/Models/TransactionDTO";
import { TransactionCard } from "./TransactionCard";

export function TransactionsLog() {
    const { profile, token } = useVerifyAuth();
    const { transactions } = useVerifyTransactions();
    const navigate = useNavigate();

    if (!profile)
        return <div>Loading profile...</div>;
    if (!token)
        return <div>Loading token...</div>;
    if (!transactions)
        return <div>Loading Transactions...</div>;

    return (
        <div className="flex flex-col w-screen h-screen place-items-center">
            <h1 className="text-2xl font-bold mb-4">Transactions Log</h1>
            <div className="grid grid-cols-4 w-[80%] border-2 text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800" >
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800  " >
                    Date:
                </div>
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                    Sender:
                </div>
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                    Receiver:
                </div>
                <div className="flex flex-wrap p-2 border-2 border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800 " >
                    Amount Sended:
                </div>
            </div>
            <div className="grid w-[80%] border-2 text-black text-2xl border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800" >
                {transactions.map((item: TransactionDTO) => (
                    <TransactionCard key={item.id} senderUserId={item.senderUserId} receiverUserId={item.receiverUserId} timestamp={item.timestamp} id={item.id} senderWalletAddress={""} receiverWalletAddress={""} amount={item.amount} transactionType={item.transactionType} />
                ))}
            </div>
            <button className=" border-2 border-blue-800 p-2 rounded-lg m-5"
                onClick={() => {
                    navigate(-1)
                }}
            >
                Go Back to first page
            </button>
        </div>
    );
}
