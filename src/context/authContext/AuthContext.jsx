import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router";

export const AuthContext = createContext();

const apiUrl = process.env.REACT_APP_API_URL;

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const getInfo = useCallback(async () => {
    try {
      const res = await axios.get(`https://localhost:7159/user/me`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      getInfo();
    } else {
      setUser(null);
    }
  }, [getInfo, location.pathname]);

  async function handleLogout() {
    try {
      const res = await axios.post(`https://localhost:7159/user/logout`);
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {}
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogout,
        message,
        setMessage,
        apiUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
