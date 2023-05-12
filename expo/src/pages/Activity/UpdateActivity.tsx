import { useState } from "react";
import { TextInput, View, Text } from "react-native";
import { TimePickerModal, DatePickerInput} from "react-native-paper-dates"
import Button from "../../components/Button";

export default function UpdateActivity(){

  const [event, setEvent] = useState<String>("")
  const [title, setTitle] = useState<String>("")
  
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();


  const [enableStartTime, setEnableStartTime] = useState<boolean>(false);
  const [enableEndTime, setEnableEndTime] = useState<boolean>(false);

  return(
    <View className="flex flex-col w-screen h-screen justify-center items-center bg-white">
      <View className="flex flex-col">
        <TextInput onChangeText={setEvent} className="p-3 border rounded m-0.5" placeholder="Evento Padre"/>
        <TextInput onChangeText={setTitle} className="p-3 border rounded m-0.5" placeholder="Titulo de la Actividad"/>

        <DatePickerInput
          className="m-0.5"
          locale="es"
          label={"Fecha Inicia"}
          value={startDate}
          onChange={(d)=>{setStartDate(d)}}
          inputMode="start"
        />

        <DatePickerInput
          className="m-0.5"
          locale="es"
          label={"Fecha Finaliza"}
          value={endDate}
          onChange={(d)=>{setEndDate(d)}}
          inputMode="start"
        />

        <View className="flex flex-row m-0.5">
          <Text className="p-2 border rounded text-center grow">
            {startDate?startDate.toLocaleDateString()+" "+startDate.toLocaleTimeString():""}
          </Text>
          
          <Text className="p-2 border rounded text-center grow">
            {endDate?endDate.toLocaleDateString()+" "+endDate.toLocaleTimeString():""}
          </Text>
        </View>

        <View className="flex flex-row">
          <TimePickerModal 
            visible={enableStartTime}
            onConfirm={({hours, minutes}) => {setEnableStartTime(false); startDate?setStartDate(new Date(startDate.getDate()+startDate.getMonth()+startDate.getFullYear()+' '+hours+':'+minutes)):startDate}}
            onDismiss={() => setEnableStartTime(false)}
          />
          <Button
            title="Tiempo Inicial"
            onPress={() => setEnableStartTime(!enableStartTime)}
          />

          <TimePickerModal 
            visible={enableEndTime}
            onConfirm={({hours, minutes}) => {setEnableEndTime(false); endDate?setEndDate(new Date(endDate.getDate()+endDate.getMonth()+endDate.getFullYear()+' '+hours+':'+minutes)):endDate}}
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