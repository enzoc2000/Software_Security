import { createContext, useContext, useState, useEffect } from "react";
import { UserDTO } from "../../../server/src/Models/UserDTO";

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
      const storedToken = localStorage.getItem("authToken");
      const storedUser  = localStorage.getItem("user");
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
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }
  }, []);

  const login = (newToken: string, newUser: UserDTO) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
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
