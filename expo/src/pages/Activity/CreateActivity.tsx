import { gql, useMutation, useQuery } from "@apollo/client";
import { Picker } from "@react-native-picker/picker";
import { useContext, useState } from "react";
import { TextInput, View, Text } from "react-native";
import { TimePickerModal, DatePickerInput } from "react-native-paper-dates"
import Button from "../../components/Button";
import { TokenContext } from "../../storage/TokenContext";

const USER_EVENTS_GQL = gql`
  query{
    learner {
      events {
        id
        title
      }
    }
  }
`

const CREATE_ACTIVITY_GQL = gql`
  mutation($createActivity: ActivityInput!){
    createActivity(createActivity: $createActivity) {
      id
      title
    }
  }
`

export default function CreateActivity() {
  const token = useContext(TokenContext);
  const context = { context: { headers: { Authorization: token } } };
  const eventQuery = useQuery(USER_EVENTS_GQL, {
    ...context
  });

  const [onCreateActivity, activityMutation] = useMutation(CREATE_ACTIVITY_GQL, {
    ...context
  });

  const [eventId, setEventId] = useState<number>(1);
  const [title, setTitle] = useState<String>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [startHour, setStartHour] = useState<Number>();
  const [endHour, setEndHour] = useState<Number>();
  const [startMinute, setStartMinute] = useState<Number>();
  const [endMinute, setEndMinute] = useState<Number>();


  const [enableStartTime, setEnableStartTime] = useState<boolean>(false);
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);

  if (eventQuery.data) {
    const events = eventQuery.data?.learner?.events as [];
    return (
      <View className="flex w-screen h-screen justify-center items-center">
        <View className="flex gap-6">
          <TextInput
            onChangeText={setTitle}
            className="p-3 border rounded"
            placeholder="Titulo de la Actividad"
          />

          <Picker
            className="p-3"
            selectedValue={eventId}
            onValueChange={(value) => {
              setEventId(value);
            }}
          >
            {
              eventQuery.data &&
              events.map((technique: any, index: number) => {
                return <Picker.Item key={index} label={technique.title} value={technique.id} />
              })
            }
          </Picker>

          <DatePickerInput
            locale="es"
            label={"Fecha"}
            value={startDate}
            onChange={(d) => { setStartDate(d) }}
            inputMode="start"
          />

          <DatePickerInput
            locale="es"
            label={"Fecha"}
            value={endDate}
            onChange={(d) => { setEndDate(d) }}
            inputMode="start"
          />

          <View className="flex flex-row m-0.5">
            <Text className="p-2 border rounded text-center grow">
              {(startHour?.toString || startMinute?.toString) === undefined ? "" : startHour?.toString() + ":" + startMinute?.toString()}
            </Text>

            <Text className="p-2 border rounded text-center grow">
              {(endHour?.toString || endMinute?.toString) === undefined ? "" : endHour?.toString() + ":" + endMinute?.toString()}
            </Text>
          </View>

          <View className="flex flex-row">
            <TimePickerModal
              visible={enableStartTime}
              onConfirm={({ hours, minutes }) => { setEnableStartTime(false); setStartHour(hours); setStartMinute(minutes) }}
              onDismiss={() => setEnableStartTime(false)}
            />
            <Button
              title="Tiempo Inicial"
              onPress={() => setEnableStartTime(!enableStartTime)}
            />

            <TimePickerModal
              visible={enableEndTime}
              onConfirm={({ hours, minutes }) => { setEnableEndTime(false); setEndHour(hours); setEndMinute(minutes) }}
              onDismiss={() => setEnableEndTime(false)}
            />

            <Button
              title="Tiempo Final"
              onPress={() => setEnableEndTime(!enableEndTime)}
            />
          </View>

          <Button
            title="Crear Actividad"
            onPress={() => {
              onCreateActivity({
                variables: {
                  createActivity: {
                    title: title,
                    startDate: startDate,
                    endDate: endDate,
                    eventId: parseInt(eventId as any)
                  }
                }
              })
            }}
          />
        </View>

      </View>
    );
  }
}
