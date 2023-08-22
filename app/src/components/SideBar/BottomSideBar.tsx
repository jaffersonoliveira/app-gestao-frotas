import { Box, HStack, Heading, Icon, Text, VStack, Avatar } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function BottomSideBar() {
  const { setSignedIn, user } = useContext(AuthContext);
  return (
    <Box h="11%" borderColor="red" borderTopWidth={1} borderTopColor="gray.800">
      <HStack h="100%" borderColor="red" p={3} justifyContent="space-between" alignItems="center">
        <Avatar bg="gray.50" size={"md"}>
          <Icon as={<MaterialIcons name="person" />} size={10} color="gray.700" />
        </Avatar>
        <VStack>
          <Heading fontSize="xs" color="gray.50">
            {user.name}
          </Heading>
          <Text color="gray.50" fontSize="xs">
            {user.function}
          </Text>
        </VStack>
        <Icon as={<MaterialIcons name="logout" />} size="xl" color="gray.50" onPress={() => setSignedIn(false)} />
      </HStack>
    </Box>
  );
}
