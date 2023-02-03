import { Formik } from "formik";
import { VStack, Text, Avatar, Button, Icon } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import TextField from "../../components/TextField";
import { useState } from "react";

export default function Login(props: { setSignedIn: Function }) {
  const [showPwd, setShowPwd] = useState(false);
  const PwdIcon = () => (
    <Icon as={<MaterialIcons name={showPwd ? "visibility" : "visibility-off"} onPress={() => setShowPwd(!showPwd)} />} size={5} mr={3} />
  );
  return (
    <Formik initialValues={{ email: "", senha: "" }} onSubmit={() => props.setSignedIn(true)}>
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
            <Avatar bg="gray.50" size={250}>
              <Icon as={<MaterialIcons name="apps" />} size="40" color="blueGray.400" />
            </Avatar>
            <VStack alignItems="center" space={1}>
              <Text fontSize="3xl" color="gray.50">
                Gestão de Frotas
              </Text>
              <Text fontSize="md" color="gray.50">
                A L TEIXEIRA
              </Text>
            </VStack>
            <TextField name="email" label="E-mail" onChangeText={handleChange("email")} placeholder="email@empresa.com" value={values.email} />
            <TextField
              name="senha"
              type={showPwd ? "text" : "password"}
              label="Senha"
              onChangeText={handleChange("senha")}
              placeholder="********"
              value={values.senha}
              InputRightElement={<PwdIcon />}
            />
            <Button colorScheme="white" size="sm">
              Esqueci minha senha
            </Button>
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
  );
}
