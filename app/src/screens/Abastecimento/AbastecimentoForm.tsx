import { Formik } from "formik";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Heading, Select, VStack, ScrollView, AlertDialog, Text, Box } from "native-base";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IReturnFetch } from "../../@types/fetch";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import TextField from "../../components/TextField";
import SelectField from "../../components/SelectField";
import { useToast } from "native-base";
import { Spinner } from "native-base";
import { useOfflineQueue } from "../../hooks";

interface initialValues {
  data: string;
  placa?: string;
  veiculo?: string;
  combustivel?: string;
  valor_litro?: string;
  valor_total_abastecido?: string;
  total_litros?: string;
  km?: string;
  km_anterior?: string;
}

export interface Vehicles {
  idveiculo: number;
  placa: string;
  veiculo?: string;
  idcombustivel?: number;
  combustivel?: string;
  preco_combustivel?: number;
}

export interface Fuels {
  idcombustivel: number;
  combustivel: string;
  preco: number;
}

type Props = NativeStackScreenProps<any>;
export default function Abastecimento(props: Props) {
  const toast = useToast();
  const queue = useOfflineQueue();
  const [isConnected, setIsConnected] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const [vehicles, setVehicles] = useState<Vehicles[]>();
  const [fuels, setFuels] = useState<Fuels[]>();
  const [km, setKm] = useState<number>(0);
  const today: string = new Date().toISOString().slice(0, 10).split("-").reverse().join("/");
  const initialValues: initialValues = { data: today };
  const validationSchema = Yup.object({
    data: Yup.string(),
    placa: Yup.string().required(),
    veiculo: Yup.string(),
    combustivel: Yup.string().required(),
    valor_litro: Yup.number().positive().required().label("valor litro"),
    //valor_total_abastecido: Yup.number().positive().label(" valor total abastecido"),
    total_litros: Yup.number().positive().required().label("total_litros"),
    km: Yup.number(),
  });

  function PopUpFinish(props: { handleSubmit: Function }) {
    const cancelRef = useRef(null);
    return (
      <>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Lançar Abastecimento</AlertDialog.Header>
            <AlertDialog.Body>Tem certeza que desejar lançar este abastecimento?</AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                  Cancelar
                </Button>
                <Button
                  colorScheme="danger"
                  onPress={() => {
                    props.handleSubmit();
                    onClose();
                  }}
                >
                  Continuar
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </>
    );
  }

  async function postData(payload: any[]) {
    if (isConnected) {
      try {
        const response = await axios.post<{ success: boolean; message: string }[]>("http://ec2-3-21-166-11.us-east-2.compute.amazonaws.com:4000/supply", payload);
        console.log(response.data);
        if (response.data[0].success) {
          props.navigation.goBack();
        } else {
          toast.show({ title: "Não foi possível lançar o abastecimento", description: response.data[0].message, bgColor: "error.500" });
        }
      } catch (e: any) {
        toast.show({ title: "Erro de rede", bgColor: "error.500" });
      }
    } else {
      queue.enqueue({
        action: "Post",
        function: "Supply",
        value: payload,
      });
      console.warn(queue.getQueue());
    }
  }

  async function getFuels() {
    if (isConnected) {
      const res = await axios<IReturnFetch<Fuels>>("http://ec2-3-21-166-11.us-east-2.compute.amazonaws.com:4000/fuel");
      setFuels(res.data.data);
      AsyncStorage.setItem("fuel", JSON.stringify(res.data.data));
    } else {
      let localFuels = await AsyncStorage.getItem("fuel");
      localFuels && setFuels(JSON.parse(localFuels));
    }
  }

  async function getVehicles() {
    console.log();
    if (isConnected) {
      const res = await axios<IReturnFetch<Vehicles>>("http://ec2-3-21-166-11.us-east-2.compute.amazonaws.com:4000/vehicle");
      setVehicles(res.data.data);
      AsyncStorage.setItem("vehicles", JSON.stringify(res.data.data));
    } else {
      let localVehicles = await AsyncStorage.getItem("vehicles");
      localVehicles && setVehicles(JSON.parse(localVehicles));
    }
  }

  async function getKm(vehicleId: string) {
    const res = await axios<IReturnFetch<{ km: number }>>(`http://ec2-3-21-166-11.us-east-2.compute.amazonaws.com:4000/supply/lastkm/${vehicleId}`);
    setKm(res.data.data[0].km ?? 0);
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => setIsConnected(state.isInternetReachable as boolean));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getVehicles();
    getFuels();
  }, [isConnected]);

  return (
    <ScrollView height="full" _dark={{ bg: "gray.700" }} _light={{ bg: "#2D3748" }}>
      <VStack p="5%" space="md">
        <Heading color="gray.50">Abastecimento</Heading>
        <Text color="gray.50">Dados do abastecimento</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, act) => {
            console.warn(values);
            act.resetForm({ values: { data: today, placa: "", combustivel: "" } });
            const vehicle = vehicles?.filter((vehicle)=> vehicle.idveiculo.toString() === values.placa)[0];
            const supply = {
              data: new Date().toISOString().replace("T", " ").replace("Z", ""),
              idveiculo: values.placa,
              idcombustivel: values.combustivel,
              preco: values.valor_litro,
              hodo_hori_pos: values.km,
              hodo_hori_ant: km ?? 0,
              quant: (parseFloat(values.valor_total_abastecido ?? "0") / parseFloat(values.valor_litro ?? "0")).toString(),
              total_abastecimento: values.valor_total_abastecido,
              veiculo: values.veiculo,
              //placa: vehicle?.placa??'',
              //desc_veiculo: vehicle?.veiculo??''
            };
            postData([supply]);
          }}
        >
          {({ handleSubmit, values, handleChange, setFieldTouched, isValid, isSubmitting, setFieldValue }) => {
            useEffect(() => {
              setFieldValue("valor_litro", fuels?.find((fuel) => fuel.idcombustivel.toString() === values.combustivel ?? "")?.preco.toString());
            }, [values.combustivel]);
            useEffect(() => {
              setFieldValue("valor_total_abastecido", (parseFloat(values.valor_litro ?? "0") * parseFloat(values.total_litros ?? "0")).toFixed(2));
            }, [values.total_litros]);
            useEffect(() => {
              const selectedVehicle = vehicles?.find((vehicle) => vehicle.idveiculo === parseInt(values.placa ?? "0"));
              selectedVehicle?.idcombustivel && setFieldValue("combustivel", selectedVehicle?.idcombustivel?.toString());
              isConnected && getKm(values.placa ?? "0");
            }, [values.placa]);
            return vehicles ? (
              <VStack space="xs" maxW="100%">
                <TextField name="data" label="Data" isDisabled />
                <SelectField name="placa" label="Placa" selectedValue={values.placa} onValueChange={handleChange("placa")}>
                  {vehicles?.map((vehicle, index) => (
                    <Select.Item key={index} label={`${vehicle.placa} | ${vehicle.veiculo ?? ""}`} value={vehicle.idveiculo.toString()} />
                  ))}
                </SelectField>
                <SelectField name="combustivel" label="Combustível" selectedValue={values.combustivel} onValueChange={handleChange("combustivel")}>
                  {fuels?.map((fuel, index) => (
                    <Select.Item key={index} label={fuel.combustivel} value={fuel.idcombustivel.toString()} />
                  ))}
                </SelectField>
                <TextField name="valor_litro" label="Preço do Litro (R$)" isDisabled value={values.valor_litro} />
                <TextField
                  name="total_litros"
                  label="Total de Litros"
                  keyboardType="decimal-pad"
                  placeholder="Ex.: 100"
                  onBlur={() => setFieldTouched("total_litros")}
                  onChangeText={handleChange("total_litros")}
                  value={values.total_litros}
                />
                <TextField name="valor_total_abastecido" label="Valor Total Abastecido(R$)" isDisabled value={values.valor_total_abastecido} />
                <TextField name="km_anterior" label="KM Anterior" isDisabled value={km?.toString()} />
                <TextField
                  name="km"
                  keyboardType="number-pad"
                  label="KM Atual"
                  onBlur={() => setFieldTouched("km")}
                  onChangeText={handleChange("km")}
                  value={values.km}
                />
                <TextField name="km_medio" isDisabled label="KM Medio" value={((parseInt(values.km ?? "0") + (km ?? 0)) / 2).toString()} />
                <Button
                  isLoading={isSubmitting}
                  h="50"
                  colorScheme="yellow"
                  mt="2"
                  title="Submit"
                  isDisabled={!isValid}
                  onPress={() => {
                    setIsOpen(true);
                  }}
                >
                  Finalizar
                </Button>
                <PopUpFinish handleSubmit={handleSubmit} />
              </VStack>
            ) : (
              <Box p="10" w="full" h="full" alignContent="center" justifyItems="center">
                <Spinner size="lg" color="white" />
              </Box>
            );
          }}
        </Formik>
      </VStack>
    </ScrollView>
  );
}
