import { createContext } from "react";

export const CredentialsContext = createContext({
  storedCreditentials: null,
  setStoredCredentials: () => {},
});
