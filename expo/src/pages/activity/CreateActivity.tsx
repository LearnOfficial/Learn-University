import { gql, useMutation, useQuery } from "@apollo/client";
import { Picker } from "@react-native-picker/picker";
import { useContext, useState } from "react";
import { TextInput, View, Text } from "react-native";
import { TimePickerModal, DatePickerInput } from "react-native-paper-dates"
import Button from "../../components/Button";
import { Page } from "../../components/Page";
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

export type ActivityObject = {
  title: string;
  startDate: Date;
  endDate: Date;
};

export type CreateActivityProps = {
  isUnique: boolean;
  onSubmit: (activity: ActivityObject) => void;
};


export default function CreateActivity({
  onSubmit,
  isUnique
}: CreateActivityProps) {
  const token = useContext(TokenContext);
  const context = { context: { headers: { Authorization: token } } };
  const eventQuery = useQuery(USER_EVENTS_GQL, {
    ...context
  });

  const [onCreateActivity, activityMutation] = useMutation(CREATE_ACTIVITY_GQL, {
    ...context
  });

  const [eventId, setEventId] = useState<number>(1);
  const [title, setTitle] = useState<string>("");

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [enableStartTime, setEnableStartTime] = useState<boolean>(false);
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);

  const events = eventQuery.data?.learner?.events as [];
  return (
    <Page
      refreshing={false}
      onRefresh={() => { }}
    >

      <View className="flex w-screen h-screen justify-center items-center bg-white">
        <View className="flex gap-2">
          <TextInput
            onChangeText={setTitle}
            className="p-3 border rounded"
            placeholder="Titulo de la Actividad"
          />

          { isUnique || <Picker
            className="p-3 border"
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

          }

          <DatePickerInput
            locale="es"
            label={"Fecha Inicia"}
            value={startDate}
            onChange={(d) => { setStartDate(d) }}
            inputMode="start"
          />

          <DatePickerInput
            locale="es"
            label={"Fecha Finaliza"}
            value={endDate}
            onChange={(d) => { setEndDate(d) }}
            inputMode="start"
          />

          <View className="flex flex-row m-0.5">
            <Text className="p-2 border rounded text-center grow">
              {startDate ? startDate.toLocaleDateString() + " " + startDate.toLocaleTimeString() : ""}
            </Text>

            <Text className="p-2 border rounded text-center grow">
              {endDate ? endDate.toLocaleDateString() + " " + endDate.toLocaleTimeString() : ""}
            </Text>
          </View>

          <View className="flex flex-row">
            <TimePickerModal
              visible={enableStartTime}
              onConfirm={({ hours, minutes }) => { setEnableStartTime(false); startDate ? setStartDate(new Date(startDate.getDate() + startDate.getMonth() + startDate.getFullYear() + ' ' + hours + ':' + minutes)) : startDate }}
              onDismiss={() => setEnableStartTime(false)}
            />
            <Button
              title="Tiempo Inicial"
              onPress={() => setEnableStartTime(!enableStartTime)}
            />

            <TimePickerModal
              visible={enableEndTime}
              onConfirm={({ hours, minutes }) => { setEnableEndTime(false); endDate ? setEndDate(new Date(endDate.getDate() + endDate.getMonth() + endDate.getFullYear() + ' ' + hours + ':' + minutes)) : endDate }}
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
              /*onCreateActivity({
                variables: {
                  createActivity: {
                    title: title,
                    startDate: startDate,
                    endDate: endDate,
                    eventId: parseInt(eventId as any)
                  }
                }
              })*/
              onSubmit({
                title: title,
                startDate: startDate!,
                endDate: endDate!
              });
            }}
          />
        </View>
      </View>
    </Page>
  );
}
