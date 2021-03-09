import { createContext } from "react";
import mongodb from "mongodb";

interface AuthContextInterface {
  isLoggedIn: Boolean,
  userId: mongodb.ObjectId | null,
  token: String | null,
  login: (uid:any, token:any, expiration:any) => void,
  logout: () => void,
}

export const AuthContext = createContext({} as AuthContextInterface);

