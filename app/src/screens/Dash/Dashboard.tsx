import { Box, Heading, Text, VStack } from "native-base";

export default function Dashboard() {
  return (
    <VStack height="full" _dark={{ bg: "gray.700" }} _light={{ bg: "#2D3748" }} p="4%" space="md">
      <Heading color="gray.50">Dashboard</Heading>
      <Text color="gray.50">Algumas métrica importantes</Text>
      <Box w="100%" h="20%" borderRadius={10} borderColor="" shadow={"4"} bgColor="#384459"></Box>
      <Box w="100%" h="20%" borderRadius={10} borderColor="" shadow={"4"} bgColor="#384459"></Box>
      <Box w="100%" h="20%" borderRadius={10} borderColor="" shadow={"4"} bgColor="#384459"></Box>
      <Box w="100%" h="20%" borderRadius={10} borderColor="" shadow={"4"} bgColor="#384459"></Box>
    </VStack>
  );
}
