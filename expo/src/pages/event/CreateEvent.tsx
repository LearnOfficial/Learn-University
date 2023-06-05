import { View } from "react-native";
import { useContext, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { TextInput } from '../../components/TextInput';
import {
  TimePickerModal,
  DatePickerInput
  // @ts-ignore 
} from "react-native-paper-dates"
import { TokenContext } from "../../storage/TokenContext";
import { gql, useMutation, useQuery } from "@apollo/client";
import { endEvent } from "react-native/Libraries/Performance/Systrace";
import { Separator } from "../../components/Separator";
import { COLORS } from "../../styles/colors";
import { Feather } from "@expo/vector-icons";
import Button from "../../components/Button";
import { Page } from "../../components/Page";
import { Text } from "../../components/Text";
import { useGraphQLContext } from "../../utils/context";

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
 

export type EventObject = { 
  title: string;
  description: string;
  techniqueId: number;
  startDate: Date;
  endDate: Date;
  type: number

};

export type CreateEventProps = {
  onSubmit: (event: EventObject) => void;
};

export default function CreateEvent({ onSubmit }: CreateEventProps) {
  const [onCreateEvent, eventMutation] = useMutation(CREATE_EVENT_GQL, useGraphQLContext());

  const techniqueQuery = useQuery(USER_TECHNIQUES, useGraphQLContext());

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [techniqueId, setTechniqueId] = useState<number>(1);


  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [enableStartTime, setEnableStartTime] = useState<boolean>(false);
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);

  const [type, setType] = useState<number>(1);

  if (eventMutation.data) {
    console.log(eventMutation.data);
  }

  return (
    <Page
      refreshing={false}
      onRefresh={() => { }}>
      <View style={{ gap: 10 }}>
        <TextInput
          onChange={setTitle}
          placeholder="Titulo"
        />
        <TextInput
          onChange={setDescription}
          placeholder="Descripción"
        />
      </View>
      <Separator title="Detalles" color={COLORS.creativity[320]} />
      <View style={{ justifyContent: "space-around", flexDirection: "row", alignItems: "center" }}>
        <DatePickerInput
          locale="es"
          label={"Fecha Inicia"}
          value={startDate}
          onChange={(d) => { setStartDate(d) }}
          inputMode="start"
        />
        <TimePickerModal
          visible={enableStartTime}
          onConfirm={({ hours, minutes }) => { setEnableStartTime(false); startDate ? setStartDate(new Date(startDate.getDate() + startDate.getMonth() + startDate.getFullYear() + ' ' + hours + ':' + minutes)) : startDate }}
          onDismiss={() => setEnableStartTime(false)}
        />
        <Button
          title="⏰"
          onPress={() => setEnableStartTime(!enableStartTime)}
        />
        <View style={{ margin: 10 }}>
          <Feather name="arrow-right-circle" size={25} color="blue" />
        </View>
        <DatePickerInput
          locale="es"
          label={"Fecha Finaliza"}
          value={endDate}
          onChange={(d) => { setEndDate(d) }}
          inputMode="start"
        />
        <TimePickerModal
          visible={enableEndTime}
          onConfirm={({ hours, minutes }) => { setEnableEndTime(false); endDate ? setEndDate(new Date(endDate.getDate() + endDate.getMonth() + endDate.getFullYear() + ' ' + hours + ':' + minutes)) : endDate }}
          onDismiss={() => setEnableEndTime(false)}
        />
        <Button
          title="⏰"
          onPress={() => setEnableEndTime(!enableEndTime)}
        />
      </View>
      <View style={{ justifyContent: "space-around", flexDirection: "row", alignItems: "center" }}>
        <Text>{startDate ? startDate.toLocaleDateString() + " " + startDate.toLocaleTimeString() : "Tiempo de Inicio"}</Text>
        <Text>{endDate ? endDate.toLocaleDateString() + " " + endDate.toLocaleTimeString() : "Tiempo de Finalización"}</Text>
      </View>

      <View style={{ gap: 10 }}>
        <View className="flex flex-row justify-end">
          <Text> ID Técnica </Text>
          <Picker
            className="flex border-2 h-10 w-5/6 ml-4"
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
        </View>
        <View className="flex flex-row justify-end">
          <Text> Tipo Técnica </Text>
          <Picker
            className="flex border-2 h-10 w-5/6 ml-4"
            selectedValue={type}
            onValueChange={(value) => {
              setType(value)
            }}>
            <Picker.Item label="Importante" value={1} />
            <Picker.Item label="Normal" value={2} />
            <Picker.Item label="Irrelevante" value={3} />
            <Picker.Item label="Flexible" value={4} />
          </Picker>
        </View>
      </View>

      <View>
        <Button
          title="Crear Evento"
          onPress={() => {
            onSubmit({
              title: title,
              description: description,
              startDate: startDate!,
              endDate: endDate!,
              techniqueId: techniqueId,
              type: type
            });
            /*
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
            })*/

          }}
        />
      </View>
    </Page>
  );
}
