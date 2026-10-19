import { createContext, useState } from "react";

export const AuthContext = createContext();

const apiUrl = process.env.REACT_APP_API_URL;

export default function AuthProvider({ children }) {
  const [message, setMessage] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        message,
        setMessage,
        apiUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
