import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
    const { logout } = useAuth();
    return (
        <ul className="flex w-screen text-2xl m-2 justify-around">
            <button className="m-2 p-2 border-2 rounded-lg border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <Link to="/actorsList">Actors list</Link>
            </button>
            <button className="m-2 p-2 border-2 rounded-lg border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <Link to="/creditsIssuing">Credits issuing</Link>
            </button>
            <button className="m-2 p-2 border-2 rounded-lg border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <Link to="/emissionsLog">Emissions log</Link>
            </button>
            <button className="m-2 p-2 border-2 rounded-lg border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <Link to="/transactionsLog">Transactions log</Link>
            </button>
            <button className="m-2 p-2 border-2 rounded-lg border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800">
                <Link to="/settings">Settings</Link>
            </button>
            <button className="m-2 p-2 border-2 rounded-lg border-b-blue-900 border-t-red-800 border-r-red-800 border-l-blue-800"
                onClick={() => {
                    logout();
                    // Redirect to home after logout
                }}>
                <Link to="/">Logout</Link>
            </button>
        </ul>
    );
}

export default Navbar;