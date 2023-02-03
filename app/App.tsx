import "react-native-gesture-handler";
import { StatusBar, NativeBaseProvider, extendTheme } from "native-base";
import Routes from "./src/routes";

// Define the config
const config = {
  // useSystemColorMode: false,
  initialColorMode: "dark",
};
const colors = {
  back: {
    50: "#2D3748",
  },
};

// extend the theme
export const theme = extendTheme({ config, colors });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar />
      <Routes />
    </NativeBaseProvider>
  );
}
