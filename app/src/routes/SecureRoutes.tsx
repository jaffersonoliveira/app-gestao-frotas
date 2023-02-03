import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "../screens/Dash/Dashboard";
import Abastecimento from "../screens/Abastecimento/AbastecimentoForm";
import CustomSidebarMenu from "../components/SideBar/CustomSidebarMenu";

const Drawer = createDrawerNavigator();

export function SecureRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#384459", shadowColor: "black" },
        headerTintColor: "#ECC94B",
        drawerActiveBackgroundColor: "white",
        drawerActiveTintColor: "#384459",
        headerPressColor: "white",
        drawerInactiveTintColor: "white",
        headerTitle: "Gestão de Frota",
        //headerLeft: () => <Icon as={<MaterialIcons name="menu" />} color="#FFF" size={6} ml={3} />,
        drawerStyle: { backgroundColor: "#384459" },
      }}
      drawerContent={(props: any) => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Abastecimento" component={Abastecimento} />
    </Drawer.Navigator>
  );
}
