import { Text, TextInput, View } from "react-native";
import { useContext, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import Button from "../../components/Button";
import {
  TimePickerModal,
  DatePickerInput
  // @ts-ignore 
} from "react-native-paper-dates"
import { TokenContext } from "../../storage/TokenContext";
import { gql, useMutation, useQuery } from "@apollo/client";
import { endEvent } from "react-native/Libraries/Performance/Systrace";

const CREATE_EVENT_GQL = gql`
  mutation($createEvent: EventInput!) {
    createEvent(createEvent: $createEvent) {
      id
    }
  }
`

const USER_TECHNIQUES = gql`
query {
  learner {
    technique {
      id
      title
    }
  }
}
`

export default function CreateEvent() {
  const token = useContext(TokenContext);
  const context = { context: { headers: { Authorization: token } } };
  const [onCreateEvent, eventMutation] = useMutation(CREATE_EVENT_GQL, {
    ...context
  });

  const techniqueQuery = useQuery(USER_TECHNIQUES, {
    ...context
  });

  const [title, setTitle] = useState<String>("");
  const [description, setDescription] = useState<String>("");
  const [techniqueId, setTechniqueId] = useState<number>(1);


  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [enableStartTime, setEnableStartTime] = useState<boolean>(false);
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);

  const [type, setType] = useState<Number>(1);

  if(eventMutation.data){
    console.log(eventMutation.data);
  }

  return (
    <View className="flex w-screen h-screen justify-center items-center bg-white">
      <View className="flex gap-3">
        <View className="flex">
          <TextInput
            onChangeText={setTitle}
            className="p-3 border rounded"
            placeholder="Titulo"
          />

          <TextInput
            onChangeText={setDescription}
            className="p-3 border rounded"
            placeholder="Descripción"
          />

        </View>

        <View>
          <DatePickerInput
            className=""
            locale="es"
            label={"Fecha Inicia"}
            value={startDate}
            onChange={(d) => { setStartDate(d) }}
            inputMode="start"
          />

          <DatePickerInput
            className=""
            locale="es"
            label={"Fecha Finaliza"}
            value={endDate}
            onChange={(d) => { setEndDate(d) }}
            inputMode="start"
          />
        </View>

        <View className="flex-row">
          <View className="flex gap-1">
            <Text className="p-2 border rounded text-center grow">{startDate?startDate.toLocaleDateString()+" "+startDate.toLocaleTimeString():""}</Text>
            <TimePickerModal
              visible={enableStartTime}
              onConfirm={({ hours, minutes }) => { setEnableStartTime(false); startDate?setStartDate(new Date(startDate.getDate()+startDate.getMonth()+startDate.getFullYear()+' '+hours+':'+minutes)):startDate}}
              onDismiss={() => setEnableStartTime(false)}
            />

            <Button
              title="Tiempo Inicial"
              onPress={() => setEnableStartTime(!enableStartTime)}
            />
          </View>

          <View className="flex gap-1">
            <Text className="p-2 border rounded text-center grow">{endDate?endDate.toLocaleDateString()+" "+endDate.toLocaleTimeString():""}</Text>
            <TimePickerModal
              visible={enableEndTime}
              onConfirm={({ hours, minutes }) => { setEnableEndTime(false); endDate?setEndDate(new Date(endDate.getDate()+endDate.getMonth()+endDate.getFullYear()+' '+hours+':'+minutes)):endDate}}
              onDismiss={() => setEnableEndTime(false)}
            />
            <Button
              title="Tiempo Final"
              onPress={() => setEnableEndTime(!enableEndTime)}
            />
          </View>
        </View>


        <View className="flex">
          <Picker
            className="p-3"
            selectedValue={techniqueId}
            onValueChange={(value) => {
              setTechniqueId(value);
            }}
          >
            {
              techniqueQuery.data &&
              techniqueQuery?.data?.learner?.technique?.map((technique: any, index: number) => {
                return <Picker.Item key={index} label={technique.title} value={technique.id} />
              })
            }
          </Picker>

          <Picker
            className="p-3"
            selectedValue={type}
            onValueChange={(value) => {
              setType(value)
            }}>
            <Picker.Item label="Importante" value={1} />
            <Picker.Item label="Normal" value={2} />
            <Picker.Item label="Irrelevante" value={3} />
            <Picker.Item label="Flexible" value={4} />
          </Picker>
        </View >

        <Button
          title="Crear Evento"
          onPress={() => {
            onCreateEvent({
              variables: {
                createEvent: {
                  title: title,
                  description: description,
                  startDate: startDate,
                  endDate: endDate,
                  techniqueId: parseInt(techniqueId as any),
                  type: parseInt(type as any)
                }
              }
            })
          }}
        />

      </View>
    </View >
  );
}
