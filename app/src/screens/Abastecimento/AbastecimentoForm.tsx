import { Formik } from "formik";
import { Button, Heading, Select, VStack, ScrollView, AlertDialog, Text } from "native-base";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IReturnFetch } from "../../@types/fetch";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import TextField from "../../components/TextField";
import SelectField from "../../components/SelectField";

interface initialValues {
  data: string;
  placa?: string;
  veiculo?: string;
  combustivel?: string;
  valor_litro?: string;
  valor_total_abastecido?: string;
  total_litros?: string;
  km?: string;
}

interface Vehicles {
  idveiculo: number;
  placa: string;
  veiculo?: string;
  combustivel?: string;
}

type Props = NativeStackScreenProps<any>;
export default function Abastecimento(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const onClose = () => setIsOpen(false);
  const [vehicles, setVehicles] = useState<Vehicles[]>();
  const today: string = new Date().toISOString().slice(0, 10).split("-").reverse().join("/");
  const initialValues: initialValues = { data: today };
  const validationSchema = Yup.object({
    data: Yup.string(),
    placa: Yup.string().required(),
    veiculo: Yup.string(),
    combustivel: Yup.string().required(),
    valor_litro: Yup.number().positive().required().label("valor litro"),
    valor_total_abastecido: Yup.number().positive().required().label(" valor total abastecido"),
    total_litros: Yup.number().positive().label("total_litros"),
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

  async function postData(values: initialValues) {
    try {
      const response = await axios.post("http://192.168.0.12:4000/supply", {
        data: new Date(values.data).toISOString().slice(0, 10),
        idveiculo: values.placa,
        combustivel: values.combustivel,
        preco: values.valor_litro,
        quant: (parseFloat(values.valor_total_abastecido ?? "0") / parseFloat(values.valor_litro ?? "0")).toString(),
        total_abastecimento: values.valor_total_abastecido,
        veiculo: values.veiculo,
      });
      props.navigation.goBack();
    } catch (e: any) {
      console.log(e);
    }
  }

  async function getVehicles() {
    const res = await axios<IReturnFetch<Vehicles>>("http://192.168.0.12:4000/vehicle");
    setVehicles(res.data.data);
  }

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <ScrollView height="full" _dark={{ bg: "gray.700" }} _light={{ bg: "#2D3748" }}>
      <VStack p="5%" space="md">
        <Heading color="gray.50">Abastecimento</Heading>
        <Text color="gray.50">Dados do abastecimento</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, act) => {
            act.resetForm({ values: { data: today, placa: "", combustivel: "" } });
            await postData(values);
          }}
        >
          {({ handleSubmit, values, handleChange, setFieldTouched, isValid, isSubmitting }) => {
            function totalLiters() {
              return (parseFloat(values.valor_total_abastecido ?? "0") / parseFloat(values.valor_litro ?? "0")).toString();
            }
            return (
              <VStack space="xs" maxW="100%">
                {/* <Button h="50" colorScheme="coolGray" borderColor="white" borderWidth="1">
                Arquivo
              </Button> */}
                <TextField name="data" label="Data" isDisabled />
                <SelectField name="placa" label="Placa" selectedValue={values.placa} onValueChange={handleChange("placa")}>
                  {vehicles?.map((vehicle, index) => (
                    <Select.Item key={index} label={vehicle.placa} value={vehicle.idveiculo.toString()} />
                  ))}
                </SelectField>
                <TextField
                  name="veiculo"
                  label="Veículo"
                  isDisabled
                  value={vehicles?.find((vehicle) => vehicle.idveiculo === parseInt(values.placa ?? "0"))?.veiculo}
                />
                <SelectField name="combustivel" label="Combustível" selectedValue={values.combustivel} onValueChange={handleChange("combustivel")}>
                  <Select.Item label="DIESEL" value="DIESEL" />
                  <Select.Item label="GASOLINA" value="GASOLINA" />
                  <Select.Item label="ALCOOL" value="ALCOOL" />
                </SelectField>
                <TextField
                  keyboardType="decimal-pad"
                  name="valor_litro"
                  label="Preço do Litro (R$)"
                  placeholder="Ex.: R$ 1.50"
                  onBlur={() => setFieldTouched("valor_litro")}
                  onChangeText={handleChange("valor_litro")}
                  value={values.valor_litro}
                />
                <TextField
                  keyboardType="decimal-pad"
                  name="valor_total_abastecido"
                  label="Valor Total Abastecido(R$)"
                  placeholder="Ex.: R$ 15.00"
                  onBlur={() => setFieldTouched("valor_total_abastecido")}
                  onChangeText={handleChange("valor_total_abastecido")}
                  value={values.valor_total_abastecido}
                />
                <TextField name="total_litros" label="Total de Litros" isDisabled value={totalLiters()} />
                <TextField
                  name="km"
                  keyboardType="number-pad"
                  label="KM Atual"
                  onBlur={() => setFieldTouched("km")}
                  onChangeText={handleChange("km")}
                  value={values.km}
                />
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
            );
          }}
        </Formik>
      </VStack>
    </ScrollView>
  );
}
