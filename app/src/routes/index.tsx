import { NavigationContainer } from "@react-navigation/native";
import { CommonRoutes } from "./CommonRoutes";
import { SecureRoutes } from "./SecureRoutes";
import * as Yup from "yup";
import { pt } from "yup-locale-pt";
import { AuthContext } from "../components/AuthContext";
import { useContext } from "react";

Yup.setLocale(pt);

export default function Routes() {
  const context = useContext(AuthContext);
  return <NavigationContainer>{context.isSignedIn ? <SecureRoutes /> : <CommonRoutes />}</NavigationContainer>;
}
