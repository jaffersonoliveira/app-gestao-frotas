import { Formik } from "formik";
import { Button, Heading, Select, Text, VStack, ScrollView } from "native-base";
import TextField from "../../components/TextField";
import SelectField from "../../components/SelectField";
import * as Yup from "yup";

interface initialValues {
  data?: string;
  placa?: string;
  veiculo?: string;
  combustivel?: string;
  valor_litro?: number;
  valor_total_abastecido?: number;
  total_litros?: number;
  km?: number;
}

export default function Abastecimento() {
  const today: string = new Date().toISOString().slice(0, 10).split("-").reverse().join("/");
  const initialValues: initialValues = { data: today, placa: "1" };
  const validationSchema = Yup.object({
    data: Yup.string(),
    placa: Yup.string(),
    veiculo: Yup.string(),
    combustivel: Yup.string().required(),
    valor_litro: Yup.number().positive().required().label("valor litro"),
    valor_total_abastecido: Yup.number().positive().required().label(" valor total abastecido"),
    total_litros: Yup.number().positive().label("total_litros"),
    km: Yup.number(),
  });
  return (
    <ScrollView height="full" _dark={{ bg: "gray.700" }} _light={{ bg: "#2D3748" }}>
      <VStack p="5%" space="md">
        <Heading color="gray.50">Abastecimento</Heading>
        <Text color="gray.50">Dados do abastecimento</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("sub ", values);
          }}
        >
          {({ handleSubmit, values, handleBlur, handleChange, errors }) => {
            console.log(values, errors);
            return (
              <VStack space="xs" maxW="100%">
                {/* <Button h="50" colorScheme="coolGray" borderColor="white" borderWidth="1">
                Arquivo
              </Button> */}
                <TextField name="data" label="Data" isDisabled />
                <SelectField name="placa" label="Placa">
                  <Select.Item label="1" value="1" />
                  <Select.Item label="2" value="2" />
                </SelectField>
                <TextField name="veiculo" label="Veículo" isDisabled />
                <TextField
                  name="combustivel"
                  label="Combustível"
                  placeholder="Ex.: DIESEL"
                  onBlur={() => handleBlur("combustivel")}
                  onChangeText={() => handleChange("combustivel")}
                  value={values.combustivel}
                />
                <TextField
                  name="valor_litro"
                  label="Preço do Litro (R$)"
                  placeholder="Ex.: R$ 1.50"
                  onBlur={() => handleBlur("valor_litro")}
                  onChangeText={() => handleChange("valor_litro")}
                  values={values.valor_litro}
                />
                <TextField
                  name="valor_total_abastecido"
                  label="Valor Total Abastecido(R$)"
                  placeholder="Ex.: R$ 15.00"
                  onBlur={() => handleBlur("valor_total_abastecido")}
                  onChangeText={() => handleChange("valor_total_abastecido")}
                  values={values.valor_total_abastecido}
                />
                <TextField
                  name="total_litros"
                  label="Total de Litros"
                  isDisabled
                  value={values.valor_total_abastecido ?? 0 / (values.valor_litro ?? 0)}
                />
                <TextField name="km" label="KM Atual" onBlur={() => handleBlur("km")} onChangeText={() => handleChange("km")} value={values.km} />
                <Button h="50" colorScheme="yellow" mt="2" onPress={() => handleSubmit()}>
                  Continuar
                </Button>
              </VStack>
            );
          }}
        </Formik>
      </VStack>
    </ScrollView>
  );
}
