import { Box, HStack, Heading, Icon, Text, VStack } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TopSideBar() {
  return (
    <Box h="9%" borderBottomWidth={1} borderBottomColor="gray.800" p={3}>
      <HStack h="100%" space={2} alignItems="center">
        <Icon as={<MaterialIcons name="apps" />} size={12} color="#ECC94B" />
        <VStack>
          <Heading fontSize="xl" color="#ECC94B">
            Gestão de Frotas
          </Heading>
          <Text color="gray.50">A L Teixeira</Text>
        </VStack>
      </HStack>
    </Box>
  );
}
