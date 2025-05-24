import { Link } from "react-router-dom";
import RegisterCardForm from "./RegisterCardForm";
export function Registration(){
    return(
        <>
            <div className="flex flex-col w-screen h-screen place-items-center" >
                <RegisterCardForm/>
                <Link to="/">Torna al Login</Link>
            </div>
        </>
    )
}
