import { Link } from "react-router-dom";
import CardForm from "./CardForm";
import supplyChainLogo from './assets/logoSupplyChain.png'
function Registration(){
    return(
        <>
            <div className="flex flex-col w-screen h-screen place-items-center" >
                <h1 className="text-center text-blue-800 mt-2 ">
                    Sustainable Food Supply Chain
                </h1>
                <div  >
                    <img className="w-auto" src={supplyChainLogo} alt="logo" />
                </div>
                <CardForm/>
                <Link to="/">Torna al Login</Link>
            </div>
        </>
    )
}

export default Registration;