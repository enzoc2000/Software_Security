import { Link } from "react-router-dom";

function Navbar() {
    return (
        <ul>
            <li>
                <Link to="/"></Link>
            </li>
            <li>
                <Link to="/firstPage">First Page</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );
}

export default Navbar;