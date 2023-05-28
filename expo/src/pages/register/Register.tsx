import { View } from "react-native";
import { TextInput } from "../../components/TextInput";
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

  const [fullname, setFullname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View className="flex flex-col w-full h-full justify-center items-center" style={{backgroundColor: "#FAFAFA"}}>
      <View className="flex flex-col" style={{gap: 12}}>
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
