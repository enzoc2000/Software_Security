import LoginCardForm from "./LoginCardForm";
import { Link } from "react-router-dom";
export function Login(){
    return(
        <>
            <div className="flex flex-col w-screen h-screen place-items-center" >
                <LoginCardForm/>
                <Link to="/registration">Registrazione</Link>
            </div>
        </>
    )
}
