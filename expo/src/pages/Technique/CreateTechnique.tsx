import { useState } from "react";
import { View, TextInput, Text } from "react-native";
import Button from "../../components/Button";
import {
  TimePickerModal,
  DatePickerInput
  // @ts-ignore 
} from "react-native-paper-dates"

export default function CreateTechnique(){

  const [title, setTitle] = useState<String>("")
  const [interval, setInterval] = useState<String>("")

  const [enableTime, setEnableTime] = useState<boolean>(false);

  const [date, setDate] = useState<Date>()
  const [hour, setHour] = useState<Number>()
  const [minute, setMinute] = useState<Number>()


  return(
    <View className="flex flex-col w-screen h-screen justify-center items-center bg-white">
      <View className="flex flex-col">
        <TextInput className="p-3 border rounded m-0.5" placeholder="Titulo de la Técnica" onChangeText={setTitle}/>

        <DatePickerInput
          className="m-0.5"
          locale="es"
          label={"Fecha"}
          value={date}
          onChange={(d)=>{setDate(d)}}
          inputMode="start"
        />

        <View className="flex flex-row m-0.5">
          <TimePickerModal
            visible={enableTime}
            onConfirm={({hours, minutes}) => {setEnableTime(false); setHour(hours); setMinute(minutes)}}
            onDismiss={() => setEnableTime(false)}
          />
          <Button
            title="Seleccionar Hora"
            onPress={() => setEnableTime(!enableTime)}
          />
          <Text className="p-2 border rounded text-center grow m-0.5">
            {(hour?.toString || minute?.toString)===undefined?"HH:MM":hour?.toString() + ":" + minute?.toString()}
          </Text>
        </View>

        <TextInput className="p-3 border rounded m-0.5" placeholder="Intervalo de Repetición" onChangeText={setInterval}/>
        <Button title="Crear Técnica" onPress={()=>{console.log(title)}}/>
      </View>
    </View>
  );
}