import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Login } from "./components/Login";
import { FirstPage } from "./components/FirstPage";
import { ExchangePage } from "./components/ExchangePage";
import { Registration } from "./components/Registration";
import { Settings } from "lucide-react";
import { CreditsIssuing } from "./components/CreditsIssuing";
import { EmissionsLog } from "./components/EmissionsLog";
import logoSupplyChain from "./components/assets/logoSupplyChain.png"
import Modal from "./components/Modal";

export function App() {
  function PrivateRoute() {
    const { token } = useAuth();
    return token ? <Outlet /> : <Navigate to="/login" />;
  }

  return (
    <>
      <header className="flex flex-col w-screen m-2 p-2 bg-blue-200">
        <div className="flex flex-col place-items-center-safe" >
          <h1 className="text-center text-blue-800 mt-2 ">
            Sustainable Food Supply Chain
          </h1>
          <div >
            <img className="place-self-center w-1/8 mt-2" src={logoSupplyChain} alt="logo" />
          </div>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {/* altre rotte pubbliche */}
        <Route element={<PrivateRoute />}>
          <Route path="/firstPage" element={<FirstPage />} />
          <Route path="/creditsIssuing" element={<CreditsIssuing />} />
          <Route path="/EmissionsLog" element={<EmissionsLog />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/modal" element={<Modal credits={0} profile={{ id: 0, role: "", name: "", city: "", address: ""}} onClose={function (): void {
            throw new Error("Function not implemented.");
          } } />} />
          <Route path="/exchangePage/:idAttore" element={<ExchangePage />} />
        </Route>
      </Routes>

    </>
  );
}
