import { Box, HStack, Heading, Icon, Text, VStack, Avatar } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function BottomSideBar() {
  return (
    <Box h="11%" borderTopWidth={1} borderTopColor="gray.800" p={3}>
      <HStack h="100%" space={5} alignContent="space-between" alignItems="center">
        <Avatar bg="gray.50" size={"md"}>
          <Icon as={<MaterialIcons name="person" />} size={10} color="gray.700" />
        </Avatar>
        <VStack>
          <Heading fontSize="xl" color="gray.50">
            Lucas de Souza
          </Heading>
          <Text color="gray.50">Administrador</Text>
        </VStack>
        <Icon as={<MaterialIcons name="settings" />} size="xl" color="gray.50" />
      </HStack>
    </Box>
  );
}
