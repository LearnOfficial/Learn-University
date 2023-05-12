import { useContext, useState } from "react";
import { View, TextInput, Text } from "react-native";
import Button from "../../components/Button";
import {
  TimePickerModal,
  DatePickerInput
  // @ts-ignore 
} from "react-native-paper-dates"
import { TokenContext } from "../../storage/TokenContext";
import { gql, useMutation } from "@apollo/client";

const CREATE_TECHNIQUE_GQL = gql`
  mutation($createTechnique: TechniqueInput!){
    createTechnique(createTechnique: $createTechnique) {
      id
      title
    }
  }
`

export default function CreateTechnique() {
  const token = useContext(TokenContext);
  const [onCreateTechnique, { data, loading, error }] = useMutation(CREATE_TECHNIQUE_GQL, {
    context: { headers: { Authorization: token } }
  });

  const [title, setTitle] = useState<String>("");
  const [focusTime, setFocusTime] = useState<number>(0);
  const [breakTime, setBreakTime] = useState<number>(0);
  const [interval, setInterval] = useState<number>(0);

  if (data) {
    const createTechnique = data?.createTechnique;
    return (
      <View className="w-screen h-screen justify-center items-center">
        <Text>Tecnica {createTechnique?.title} {createTechnique?.id} ID creada.</Text>
      </View>
    )
  }

  return (
    <View className="flex flex-col w-screen h-screen justify-center items-center bg-white gap-6">
      <View className="flex flex-col">
        <TextInput className="p-3 border rounded m-0.5" placeholder="Titulo de la Técnica" onChangeText={setTitle} />

        <View className="flex flex-row justify-between items-center gap-6">
          <Text>Tiempo de concentración (min)</Text>
          <TextInput
            value={`${focusTime}`}
            className="p-3 border rounded m-0.5"
            onChangeText={(e) => setFocusTime(parseInt(e))}
          />
        </View>

        <View className="flex flex-row justify-between items-center gap-6">
          <Text>Tiempo de descanso (min)</Text>
          <TextInput
            value={`${breakTime}`}
            className="p-3 border rounded m-0.5"
            onChangeText={(e) => setBreakTime(parseInt(e))}
          />
        </View>

        <View className="flex flex-row justify-between items-center gap-6">
          <Text>Intervalo de repetición</Text>
          <TextInput
            value={`${interval}`}
            className="p-3 border rounded m-0.5"
            onChangeText={(e) => setInterval(parseInt(e))}
          />
        </View>
      </View>
      <Button
        title="Crear Técnica"
        onPress={() => {
          onCreateTechnique({
            variables: {
              createTechnique: {
                title: title,
                breakTime: breakTime,
                focusTime: focusTime,
                interval: interval
              }
            }
          });
        }}
      />
    </View>
  );
}
