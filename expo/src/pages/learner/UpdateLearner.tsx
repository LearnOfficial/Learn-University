import { TextInput, View } from "react-native";
import Button from "../../components/Button";
import { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { saveToken } from "../../storage/token";
import { SetTokenContext, TokenContext } from "../../storage/TokenContext";

const UPDATE_LEARNER_GQL = gql`
  mutation($learnerInput: LearnerUpdateInput!) {
    updateLearner(learnerInput: $learnerInput) {
      id
    }
  }
`;


export default function UpdateLearner({ navigation }) {
  const token = useContext(TokenContext);
  const context = { context: { headers: { Authorization: token } } };
  const [onUpdateLearner, { data, loading, error }] = useMutation(UPDATE_LEARNER_GQL, {
    ...context
  });

  if (data) {
    navigation.navigate("Inicio");
  }

  if (error) {
    alert("No se ha podido conectar a la Base de Datos.");
  }

  const [fullname, setFullname] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  return (
    <View className="flex flex-col w-screen h-screen justify-center items-center bg-white">
      <View className="flex flex-col">
        <TextInput
          onChangeText={setFullname}
          className="p-3 border rounded"
          placeholder="Nombre Completo" />

        <TextInput
          secureTextEntry
          onChangeText={setPassword}
          className="p-3 border rounded"
          placeholder="Contraseña" />

        <View className="flex flex-row">
          <Button title="Actualizar estudiante" onPress={() => {
            if (password.length != 0) {
              onUpdateLearner({
                variables: {
                  learnerInput: {
                    fullname: fullname,
                    password: password
                  }
                }
              });
            } else {
              alert("Todos los campos son obligatorios.")
            }
          }} />
        </View>
      </View>
    </View>
  );
}
