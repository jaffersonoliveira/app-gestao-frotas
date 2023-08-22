import { Heading, VStack, Text, ScrollView, HStack, Icon, Spinner, Box } from "native-base";
import NetInfo from "@react-native-community/netinfo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import axios from "axios";
import ItemList from "../../components/ItemList";
//import { useOfflineQueue } from "../../hooks";
export interface ISupply {
  id_abastecimento: number;
  data: string;
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
/*   const Queue = useOfflineQueue();
  const [isConnected, setIsConnected] = useState(true); */
  async function getSupplies() {
    // if (isConnected){
      const res = await axios<{
        success: boolean;
        message: string;
        data: ISupply[];
      }>("http://ec2-3-21-166-11.us-east-2.compute.amazonaws.com:4000/supply");
      console.log(res.data.data);
      setSupplies(res.data.data);
    /* } else {
      const parseToSupply = (supply: any)=> {
        supply['placa'] = supply.idveiculo;
        supply['desc_veiculo'] = supply.veiculo;
        return supply
      }
      const queue = Queue.getQueue()
      const localSupply = queue.filter((item)=>item.function === 'Supply').map((item)=>parseToSupply(item.value[0])) as ISupply[]
      console.warn(localSupply);
      setSupplies(localSupply);
    } */
  }

/*   useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => setIsConnected(state.isInternetReachable as boolean));
    return () => unsubscribe();
  }, []); */

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
