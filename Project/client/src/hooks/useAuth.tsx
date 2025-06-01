import { createContext, useContext, useState, useEffect } from "react";
import { UserDTO } from "../Models/UserDTO";

interface Auth {
  user: UserDTO | null;
  token: string | null;
  login: (token: string, user: UserDTO) => void;
  logout: () => void;
}

const AuthContext = createContext<Auth | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Al montaggio, recupera da localStorage
  useEffect(() => {
    try {
      const storedToken = sessionStorage.getItem("authToken");
      const storedUser  = sessionStorage.getItem("user");
      console.log({storedToken});
      console.log({storedUser});
      
      if (storedToken) {
        setToken(storedToken);
      }

      if (storedUser) {
        // Solo parse se non è null
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Errore nel ripristino dell'Auth:", err);
      // in caso di JSON malformato, rimuovi tutto
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("user");
    }
  }, []);

  const login = (newToken: string, newUser: UserDTO) => {
    setToken(newToken);
    setUser(newUser);
    sessionStorage.setItem("authToken", newToken);
    sessionStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook per usarlo
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve essere usato dentro AuthProvider");
  return ctx;
}
