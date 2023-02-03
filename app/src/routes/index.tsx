import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { CommonRoutes } from "./CommonRoutes";
import { SecureRoutes } from "./SecureRoutes";
import * as Yup from "yup";
import { pt } from "yup-locale-pt";

Yup.setLocale(pt);

export default function Routes() {
  const [isSignedIn, setSignedIn] = useState(false);
  return <NavigationContainer>{isSignedIn ? <SecureRoutes /> : <CommonRoutes setSignedIn={setSignedIn} />}</NavigationContainer>;
}
