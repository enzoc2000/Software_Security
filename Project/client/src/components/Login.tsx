import LoginCardForm from "./LoginCardForm";
import supplyChainLogo from './assets/logoSupplyChain.png'
import { Link } from "react-router-dom";
function Login(){
    return(
        <>
            <div className="flex flex-col w-screen h-screen place-items-center" >
                <h1 className="text-center text-blue-800 mt-2 ">
                    Sustainable Food Supply Chain
                </h1>
                <div >
                    <img className="w-auto" src={supplyChainLogo} alt="logo" />
                </div>
                <LoginCardForm/>
                <Link to="/registration">Registrazione</Link>
            </div>
        </>
    )
}

export default Login;