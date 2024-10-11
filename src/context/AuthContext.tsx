import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  jwt: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jwt, setJwt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let jwt;
    const cookies = document.cookie.split("; ");
    const jwtCookie = cookies.find((cookie) => cookie.startsWith("jwt="));

    if (jwtCookie) {
      const jwtValue = jwtCookie.split("=")[1];
      jwt = jwtValue;
    } else {
      console.log("user is logged out");
      jwt = null;
    }
    setJwt(jwt);
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <h1>Kraunasi...</h1>;
  }

  return (
    <AuthContext.Provider value={{ jwt }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
