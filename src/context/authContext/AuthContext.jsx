import { createContext, useState } from "react";

export const AuthContext = createContext();

const apiUrl = process.env.REACT_APP_API_URL;

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

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
