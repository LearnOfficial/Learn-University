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
import { Snackbar } from "react-native-paper";

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


  let technique;

  if(data){ 
    technique = data?.createTechnique;
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
            onChangeText={(e) => {
              const regex = /[a-zA-Z]/g;
              if (regex.test(e) || /\s\t\n/g.test(e)) {
                setFocusTime(0);
              } else {
                setFocusTime(parseInt(e));
              }
            }}
          />
        </View>

        <View className="flex flex-row justify-between items-center gap-6">
          <Text>Tiempo de descanso (min)</Text>
          <TextInput
            value={`${breakTime}`}
            className="p-3 border rounded m-0.5"
            onChangeText={(e) => {
              const regex = /[a-zA-Z]/g;
              if (regex.test(e) || /\s\t\n/g.test(e)) {
                setBreakTime(0);
              } else {
                setBreakTime(parseInt(e));
              }
            }}
          />
        </View>

        <View className="flex flex-row justify-between items-center gap-6">
          <Text>Intervalo de repetición</Text>
          <TextInput
            value={`${interval}`}
            className="p-3 border rounded m-0.5"
            onChangeText={(e) => {
              const regex = /[a-zA-Z]/g;
              if (regex.test(e) || /\s\t\n/g.test(e)) {
                setInterval(0);
              } else {
                setInterval(parseInt(e));
              }
            }}
          />
        </View>
      </View> 

    { 
        data && <Snackbar
          className="text-slate-50"
          visible={true}
          onDismiss={() => {}}
          action={{
            label: 'Undo',
            onPress: () => {
            }
          }}
        > 
          La técnica {technique?.title} se ha creado exitosamente.
        </Snackbar>
      }

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
    </View >
  );
}
