import CardForm from "./CardForm";
import supplyChainLogo from './assets/logoSupplyChain.png'
import connectWallet from "../utils/ConnectWallet";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
function Login(){

    const objPromise = connectWallet();
    objPromise.then((obj) => {
        console.log(JSON.stringify(obj))
    })

    return(
        <>
            <div className="flex flex-col w-screen h-screen place-items-center" >
                <h1 className="text-center text-blue-800 mt-2 ">
                    Sustainable Food Supply Chain
                </h1>
                <div >
                    <img className="w-auto" src={supplyChainLogo} alt="logo" />
                </div>
                <button onClick={connectWallet} 
                    className="text-sm ms-50 border-2 font-bold py-1 px-1">
                    Connect Wallet
                </button>
                <CardForm/>
                <Link to="/registration">Registrazione</Link>
            </div>
        </>
    )
}

export default Login;