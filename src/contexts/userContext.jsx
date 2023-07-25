/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useState } from "react";

const UserContext = createContext();
const initialState = { currOpenModal: null, isOpenModal: false };

function reducer(state, action) {
  switch (action.type) {
    case "modal/deposit":
      return { ...state, currOpenModal: "deposit", isOpenModal: true };
    case "modal/withdraw":
      return { ...state, currOpenModal: "withdraw", isOpenModal: true };
    case "modal/close":
      return { ...state, currOpenModal: null, isOpenModal: false };
  }
}

export default function UserContextProvider({ children }) {
  const [isVerified, setIsVerified] = useState(false);
  const [{ currOpenModal, isOpenModal }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <UserContext.Provider
      value={{
        isVerified,
        setIsVerified,
        currOpenModal,
        isOpenModal,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) throw new Error("Context used in forbidden place");
  return context;
}
