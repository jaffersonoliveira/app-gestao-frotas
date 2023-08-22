import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState } from "react";
import axios from "axios";
interface IAuthContext {
  isSignedIn: Boolean;
  setSignedIn: (prevState: any) => void;
  user: {
    name: string;
    function: string;
  };
  setUser: (prevState: any) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default function UseContext({ children }: any) {
  const [isSignedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; function: string }>({} as { name: string; function: string });
  /*   const [isSyncSupplies, setIsSyncSupplies] = useState<boolean>(false);

  async function syncSupplies() {
    setIsSyncSupplies(true);
    const strSupplies = await AsyncStorage.getItem("supplies");
    AsyncStorage.removeItem("supplies");
    console.warn(strSupplies);
    if (strSupplies) {
      const response = await axios.post<{ success: boolean }[]>(
        "http://ec2-3-21-166-11.us-east-2.compute.amazonaws.com:4000/supply",
        JSON.parse(strSupplies)
      );
      // verificar no retorno do api quais abastecimento deram erro
    }
    setIsSyncSupplies(false);
  } */

  return <AuthContext.Provider value={{ isSignedIn, setSignedIn, user, setUser }}>{children}</AuthContext.Provider>;
}
