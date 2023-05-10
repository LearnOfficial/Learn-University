import { Text, TextInput, View } from "react-native";
import { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import Button from "../../components/Button";
import {
  TimePickerModal,
  DatePickerInput
  // @ts-ignore 
} from "react-native-paper-dates"

export default function CreateEvent() {
  const [title, setTitle] = useState<String>("");
  const [description, setDescription] = useState<String>("");

  const[date, setDate] = useState<Date>();
  const [time, setTime] = useState<String>("");

  const [enableStartTime, setEnableStartTime] = useState<boolean>(false);
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);


  const [selectedLanguage, setSelectedLanguage] = useState();
  const [typeEvent, setTypeEvent] = useState<Number>();

  return (

    <View className="flex flex-col w-screen h-screen justify-center items-center bg-white">
      <Text className="font-bold m-0.5">CREAR EVENTO</Text>
      <View className="flex flex-col">

        <TextInput
          onChangeText={setTitle}
          className="p-3 border rounded m-0.5"
          placeholder="Titulo"
        />

        <TextInput
          onChangeText={setTitle}
          className="p-3 border rounded m-0.5"
          placeholder="Descripción"
        />

        <DatePickerInput
          className="m-0.5"
          locale="es"
          label={"Fecha"}
          value={date}
          onChange={(d)=>{setDate(d)}}
          inputMode="start"
          />

        <View className="flex flex-row">
          <Text className="p-2 border rounded text-center grow m-0.5">{}</Text>
          <Text className="p-2 border rounded text-center grow m-0.5">{}</Text>
        </View>

        <View className="flex flex-row m-0.5">
          <TimePickerModal
            visible={enableStartTime}
            onConfirm={({hours, minutes}) => {setEnableStartTime(false); console.log(hours, minutes)}}
            onDismiss={() => setEnableStartTime(false)}
          />
          <Button
            title="Tiempo Inicial"
            onPress={() => setEnableStartTime(!enableStartTime)}
          />

          <TimePickerModal 
            visible={enableEndTime}
            onConfirm={({hours, minutes}) => {setEnableEndTime(false); console.log(hours, minutes)}}
            onDismiss={() => setEnableEndTime(false)}
          />

          <Button
            title="Tiempo Final"
            onPress={() => setEnableEndTime(!enableEndTime)}
          />

        </View>

        <View className="p-3 border rounded grow m-0.5">
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedLanguage(itemValue);
              setTypeEvent(itemValue)
            }}>
              <Picker.Item label="Importante" value={1}/>
              <Picker.Item label="Normal" value={2}/>
              <Picker.Item label="Irrelevante" value={3}/>
              <Picker.Item label="Flexible" value={4}/>
          </Picker>
        </View>
        <Button
          title="Crear Evento"
          onPress={() => console.log()}
        />
      </View>
    </View>
  );
}
