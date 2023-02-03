import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";

const Stack = createNativeStackNavigator();

export function CommonRoutes(props: { setSignedIn: Function }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={() => <Login setSignedIn={props.setSignedIn} />} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
