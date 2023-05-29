import { useContext, useState } from "react";
import { View } from "react-native";
import Button from "../../components/Button";
import { TokenContext } from "../../storage/TokenContext";
import { gql, useMutation } from "@apollo/client";
import { TextInput } from "../../components/TextInput";
import { Text } from "../../components/Text";

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
    <View style={{gap: 12}}>
      <View className="flex flex-col" style={{gap: 12}}>
        <TextInput placeholder="Titulo de la Técnica" onChange={setTitle} />
        <View className="flex flex-row justify-between items-center">
          <Text>Tiempo de concentración (min)</Text>
          <TextInput
            placeholder="25"
            onChange={(e) => {
              const regex = /[a-zA-Z]/g;
              if (regex.test(e) || /\s\t\n/g.test(e)) {
                setFocusTime(0);
              } else {
                setFocusTime(parseInt(e));
              }
            }}
          />
        </View>

        <View className="flex flex-row justify-between items-center">
          <Text>Tiempo de descanso (min)</Text>
          <TextInput
            placeholder="5"
            onChange={(e) => {
              const regex = /[a-zA-Z]/g;
              if (regex.test(e) || /\s\t\n/g.test(e)) {
                setBreakTime(0);
              } else {
                setBreakTime(parseInt(e));
              }
            }}
          />
        </View>

        <View className="flex flex-row justify-between items-center">
          <Text>Intervalo de repetición</Text>
          <TextInput
            placeholder="5"
            onChange={(e) => {
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
