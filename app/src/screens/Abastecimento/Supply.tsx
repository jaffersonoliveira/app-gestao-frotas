import { Heading, VStack, Text, ScrollView, HStack, Icon, Spinner, Center, Box } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import axios from "axios";
import ItemList from "../../components/ItemList";

export interface ISupply {
  id_abastecimento: number;
  data: Date;
  idveiculo: number;
  combustivel: string;
  preco: number;
  quant: number;
  total_abastecimento: number;
  hodometro_ant: null;
  tipo?: string;
  veiculo?: string;
  modelo?: string;
  desc_veiculo: string;
  placa: string;
}

type Props = NativeStackScreenProps<any>;
export default function Supply(props: Props) {
  const [supplies, setSupplies] = useState<ISupply[]>();
  async function getSupplies() {
    const res = await axios<{
      success: boolean;
      message: string;
      data: ISupply[];
    }>("http://192.168.0.12:4000/supply");
    setSupplies(res.data.data);
  }
  useEffect(() => {
    getSupplies();
  }, []);

  return (
    <ScrollView h="full" _dark={{ bg: "gray.700" }} _light={{ bg: "#2D3748" }}>
      {supplies ? (
        <VStack p="5%" space="md">
          <HStack alignItems="center" space="2">
            <Heading color="gray.50">Abastecimento</Heading>
            <Icon as={<MaterialIcons name="add-circle" />} size="xl" color="#ECC94B" onPress={() => props.navigation.navigate("AbastecimentoForm")} />
          </HStack>
          <Text color="gray.50">Listagem de abastecimentos</Text>
          {supplies?.map((supply) => (
            <ItemList datas={supply} />
          ))}
        </VStack>
      ) : (
        <Box p="10" w="full" h="full" alignContent="center" justifyItems="center">
          <Spinner size="lg" color="white" />
        </Box>
      )}
    </ScrollView>
  );
}
