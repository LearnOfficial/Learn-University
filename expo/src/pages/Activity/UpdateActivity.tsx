import { useState } from "react";
import { TextInput, View, Text } from "react-native";
import { TimePickerModal, DatePickerInput} from "react-native-paper-dates"
import Button from "../../components/Button";

export default function UpdateActivity(){

  const [event, setEvent] = useState<String>("")
  const [title, setTitle] = useState<String>("")
  const [date, setDate] = useState<Date>()
  
  const [startHour, setStartHour] = useState<Number>()
  const [endHour, setEndHour] = useState<Number>()
  const [startMinute, setStartMinute] = useState<Number>()
  const [endMinute, setEndMinute] = useState<Number>()


  const [enableStartTime, setEnableStartTime] = useState<boolean>(false);
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);

  return(
    <View className="flex flex-col w-screen h-screen justify-center items-center bg-white">
      <Text className="font-bold m-0.5">ACTUALIZAR ACTIVIDAD</Text>
      <View className="flex flex-col">
        <TextInput onChangeText={setEvent} className="p-3 border rounded m-0.5" placeholder="Evento Padre"/>
        <TextInput onChangeText={setTitle} className="p-3 border rounded m-0.5" placeholder="Titulo de la Actividad"/>

        <DatePickerInput
          className="m-0.5"
          locale="es"
          label={"Fecha"}
          value={date}
          onChange={(d)=>{setDate(d)}}
          inputMode="start"
        />

        <View className="flex flex-row m-0.5">
          <Text className="p-2 border rounded text-center grow">
            {(startHour?.toString || startMinute?.toString)===undefined?"":startHour?.toString() + ":" + startMinute?.toString()}
          </Text>
          
          <Text className="p-2 border rounded text-center grow">
            {(endHour?.toString || endMinute?.toString)===undefined?"":endHour?.toString() + ":" + endMinute?.toString()}
          </Text>
        </View>

        <View className="flex flex-row">
          <TimePickerModal 
            visible={enableStartTime}
            onConfirm={({hours, minutes}) => {setEnableStartTime(false); setStartHour(hours); setStartMinute(minutes)}}
            onDismiss={() => setEnableStartTime(false)}
          />
          <Button
            title="Tiempo Inicial"
            onPress={() => setEnableStartTime(!enableStartTime)}
          />

          <TimePickerModal 
            visible={enableEndTime}
            onConfirm={({hours, minutes}) => {setEnableEndTime(false); setEndHour(hours); setEndMinute(minutes)}}
            onDismiss={() => setEnableEndTime(false)}
          />

          <Button
            title="Tiempo Final"
            onPress={() => setEnableEndTime(!enableEndTime)}
          />
        </View>

        <Button title="Actualizar Actividad" onPress={()=>console.log()}/>
      </View>

    </View>
  );
}