import { TextInput, View } from "react-native";
import Button from "../../components/Button";
import { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { saveToken } from "../../storage/token";
import { SetTokenContext } from "../../storage/TokenContext";

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
  
  if(error){
    alert("No se ha podido conectar a la Base de Datos.");
  }

  const [fullname, setFullname] = useState<String>("");
  const [username, setUsername] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  return (
    <View className="flex flex-col w-screen h-screen justify-center items-center bg-white">
      <View className="flex flex-col">
        <TextInput
          onChangeText={setFullname}
          className="p-3 border rounded"
          placeholder="Nombre Completo" />

        <TextInput
          onChangeText={setUsername}
          className="p-3 border rounded"
          placeholder="Nombre de Usuario" />

        <TextInput
          onChangeText={setEmail}
          className="p-3 border rounded"
          placeholder="Correo Electronico" />

        <TextInput
          secureTextEntry
          onChangeText={setPassword}
          className="p-3 border rounded"
          placeholder="Contraseña" />

        <View className="flex flex-row">
          <Button title="Cancelar" onPress={() => { navigation.navigate("Login") }} />
          <Button title="Registrarme" onPress={()=>{
            if(fullname.length != 0 && username.length != 0 && email.length != 0 && password.length!=0){
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
            }else{
              alert("Todos los campos son obligatorios.")
            }
          }} />
        </View>
      </View>
    </View>
  );
}
