/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [isVerified, setIsVerified] = useState(false);
  return (
    <UserContext.Provider value={{ isVerified, setIsVerified }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) throw new Error("Context used in forbidden place");
  return context;
}
