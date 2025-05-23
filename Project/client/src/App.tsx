import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Login } from "./components/Login";
import { FirstPage } from "./components/FirstPage";
import { ExchangePage } from "./components/ExchangePage";
import {Registration} from "./components/Registration";

export function App() {
  function PrivateRoute() {
    const { token } = useAuth();
    return token ? <Outlet /> : <Navigate to="/login" />;
  }

  return(
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      {/* altre rotte pubbliche */}
      <Route element={<PrivateRoute />}>
        <Route path="/firstPage" element={<FirstPage />} />
        <Route path="/exchangePage/:idAttore" element={<ExchangePage />} />
        {/* altre rotte protette */}
      </Route>
    </Routes>
  );
}
