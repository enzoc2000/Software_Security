import { Link } from "react-router-dom";

function Navbar() {
    return (
        <ul>
            <li>
                <Link to="/registration">Registrazione</Link>
            </li>
        </ul>
    );
}

export default Navbar;