import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import TopSideBar from "./TopSideBar";
import BottomSideBar from "./BottomSideBar";

export default function CustomSidebarMenu(props: any) {
  return (
    <SafeAreaView>
      <VStack h="full">
        <TopSideBar />
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props}>{}</DrawerItemList>
        </DrawerContentScrollView>
        <BottomSideBar />
      </VStack>
    </SafeAreaView>
  );
}
