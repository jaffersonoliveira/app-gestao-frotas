import React, { createContext, useState } from "react";

export const AuthContext = createContext({ isSignedIn: true, setSignedIn: (prevState: any) => {} });

export default function UseContext({ children }: any) {
  const [isSignedIn, setSignedIn] = useState(false);

  return <AuthContext.Provider value={{ isSignedIn, setSignedIn }}>{children}</AuthContext.Provider>;
}
