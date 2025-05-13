import Cookies from "js-cookie";
import { createContext, useState, type ReactNode, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  email: string;
  full_name: string;
  image: {
    url: string;
  };
  token: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  user: (userData: User) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user"); 
      }
    }
    setLoading(false); 
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/admin/auth/login",
        {
          email,
          password,
        }
      );

      const data = response.data.data;
      const token = data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data));
      Cookies.set("token", token);
      setCurrentUser(data);
    } catch (error) {
      if (error instanceof Error) console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const user = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
