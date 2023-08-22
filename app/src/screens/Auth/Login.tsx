import { Formik } from "formik";
import NetInfo from "@react-native-community/netinfo";
import { VStack, Text, Avatar, Button, Icon, useToast } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import TextField from "../../components/TextField";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../components/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import axios from "axios";
import { Image } from "native-base";
//import logo from "../../logo.jpg";

export default function Login() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  async function getLocalInfo() {
    const localUser = await AsyncStorage.getItem("user");
    if (localUser) {
      setSignedIn(true);
      setUser(JSON.parse(localUser));
    }
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isInternetReachable) {
        getLocalInfo();
      } else {
        setIsConnected(state.isInternetReachable);
      }
    });
    return () => unsubscribe();
  }, []);

  interface IInitalValues {
    usuario: string;
    senha: string;
  }

  const { setSignedIn, setUser } = useContext(AuthContext);
  const [showPwd, setShowPwd] = useState(false);
  const initialValues: IInitalValues = { usuario: "", senha: "" };
  const validationScheme = Yup.object({
    usuario: Yup.string().required().label("Usuario"),
    senha: Yup.string().required().label("Senha"),
  });
  const toast = useToast();
  const PwdIcon = () => (
    <Icon as={<MaterialIcons name={showPwd ? "visibility" : "visibility-off"} onPress={() => setShowPwd(!showPwd)} />} size={5} mr={3} />
  );

  async function auth(values: IInitalValues) {
    const data = { user: values.usuario, pwd: values.senha };
    try {
      const res = await axios.post<{ success: boolean; message: string; data: Object }>("http://ec2-3-21-166-11.us-east-2.compute.amazonaws.com:4000/auth", data);
      if (!res.data.success) {
        toast.show({
          description: res.data.message,
          bgColor: "error.500",
        });
      }
      AsyncStorage.setItem("user", JSON.stringify(res.data.data));
      setSignedIn(res.data.success);
      setUser(res.data.data);
    } catch (err) {
      toast.show({
        title: "Erro de rede",
        bgColor: "error.500",
      });
    }
  }

  /*   async function getLocalInfo() {
    const localUser = await AsyncStorage.getItem("user");
    if (localUser) {
      setSignedIn(true);
      setUser(JSON.parse(localUser));
    }
  }

  async function syncSupplies() {
    const strSupplies = await AsyncStorage.getItem("supplies");
    console.warn(strSupplies);
    if (strSupplies) {
      const response = await axios.post<{ success: boolean }[]>("http://ec2-3-21-166-11.us-east-2.compute.amazonaws.com:4000/supply", JSON.parse(strSupplies));
      // verificar no retorno do api quais abastecimento deram erro
      AsyncStorage.removeItem("supplies");
    }
  } */

  /*   useEffect(() => {
    console.warn("effect");
    getLocalInfo();
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.warn(state);
      if (state.isConnected) syncSupplies();
    });
  }, []); */

  return (
    isConnected && (
      <Formik initialValues={initialValues} validationSchema={validationScheme} onSubmit={(values) => auth(values)}>
        {({ handleChange, values, handleSubmit }) => (
          <SafeAreaView>
            <VStack
              height="full"
              _dark={{ bg: "gray.700" }}
              _light={{ bg: "#2D3748" }}
              px="10%"
              py="5%"
              alignItems="center"
              justifyContent="space-between"
            >
              <Avatar bg="white" size={250}>
                {/* <Icon as={<MaterialIcons name="apps" />} size="40" color="blueGray.400" /> */}
                <Image source={require("../../../assets/logo.jpg")} resizeMode="contain" size="170" />
              </Avatar>
              <VStack alignItems="center" space={1}>
                <Text fontSize="3xl" color="gray.50">
                  Gestão de Frotas
                </Text>
                <Text fontSize="md" color="gray.50">
                  A L TEIXEIRA
                </Text>
              </VStack>
              <TextField name="usuario" label="Usuário" onChangeText={handleChange("usuario")} placeholder="Ex.: admin" value={values.usuario} />
              <TextField
                name="senha"
                //type={showPwd ? "text" : "password"}
                secureTextEntry={!showPwd}
                label="Senha"
                onChangeText={handleChange("senha")}
                placeholder="********"
                value={values.senha}
                InputRightElement={<PwdIcon />}
              />
              {/*            <Button colorScheme="white" size="sm">
              Esqueci minha senha
            </Button> */}
              <Button w="100%" colorScheme="yellow" h="50px" borderRadius={6} onPress={() => handleSubmit()}>
                Entrar
              </Button>
              <Text color="gray.400" fontSize="xs">
                Versão 1.0.0
              </Text>
            </VStack>
          </SafeAreaView>
        )}
      </Formik>
    )
  );
}
