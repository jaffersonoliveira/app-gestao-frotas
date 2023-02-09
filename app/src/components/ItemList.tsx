import { HStack, Text, Box, Icon, VStack, Heading } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ISupply } from "../screens/Abastecimento/Supply";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = { datas: ISupply };
export default function ItemList(props: Props) {
  return (
    <Box w="100%" h="70" borderRadius="8" bgColor="#384459" shadow={"5"} justifyContent="center" p="3">
      <HStack alignItems="center" space="md">
        <Icon as={<MaterialIcons name="fuel" />} size="xl" color="#ECC94B" />
        <VStack>
          <Heading color="white">{props.datas.desc_veiculo.slice(0, 15)}</Heading>
          <HStack justifyContent="space-between">
            <Text color="white">{new Date(props.datas.data).toLocaleDateString("pt_BR")}</Text>
            <Text color="white"> | R$ {props.datas.total_abastecimento}</Text>
            <Text color="white"> | {props.datas.placa}</Text>
          </HStack>
        </VStack>
        {/* <Icon as={<MaterialIcons name="edit-off" />} size="xl" color="gray.500" /> */}
      </HStack>
    </Box>
  );
}
