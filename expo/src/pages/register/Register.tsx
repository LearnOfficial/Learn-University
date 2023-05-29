import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "../../components/TextInput";
import Button from "../../components/Button";
import { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { saveToken } from "../../storage/token";
import { SetTokenContext } from "../../storage/TokenContext";
import { COLORS } from "../../styles/colors";

const REGISTER_GQL = gql`
  mutation($signupInput: LearnerSignUpInput!){
    createLearner(signupInput: $signupInput) {
      token
    }
  }
`;


export default function CreateLearner({ navigation }) {
  const [onRegister, { data, loading, error }] = useMutation(REGISTER_GQL);
  const setTokenContext = useContext(SetTokenContext);

  if (data) {
    const newToken = data?.createLearner?.token;
    (async () => {
      await saveToken(newToken);
    })();
    setTokenContext!(newToken);
  }

  if (error) {
    alert("No se ha podido conectar a la Base de Datos.");
  }

  const [fullname, setFullname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View className="flex w-full h-full justify-center p-3 md:items-center" style={{ backgroundColor: "#FAFAFA" }}>
      <View className="flex flex-col md:w-96" style={{ gap: 12 }}>


        <TextInput
          onChange={setFullname}
          placeholder="Nombre Completo" />

        <TextInput
          onChange={setUsername}
          placeholder="Nombre de Usuario" />

        <TextInput
          onChange={setEmail}
          placeholder="Correo Electronico" />

        <TextInput
          onChange={setPassword}
          placeholder="Contraseña" />

        <View className="flex" style={{gap: 12}}>

          <Button title="Registrarme" onPress={() => {
            if (fullname.length != 0 && username.length != 0 && email.length != 0 && password.length != 0) {
              onRegister({
                variables: {
                  signupInput: {
                    username: username,
                    email: email,
                    fullname: fullname,
                    password: password
                  }
                }
              });
            } else {
              alert("Todos los campos son obligatorios.")
            }
          }} />

          <View className="flex flex-row" style={{gap: 7}}>
            <Text style={{fontFamily: "Lexend"}}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => { navigation.navigate("Login") }}
            >
              <Text style={{fontFamily: "Lexend", fontWeight: "800", color: COLORS.creativity[350]}}>Sign in.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
