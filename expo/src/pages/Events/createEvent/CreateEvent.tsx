import { TextInput, Text } from "react-native";
import { useState } from "react";
import {Picker} from '@react-native-picker/picker';
import Button from "../../../components/Button";

export default function CreateEvent(){
  const [title, setTitle] = useState<String>("");
  const [description, setDescription] = useState<String>("");


  const [date, setDate] = useState<String>("");
  const [iniTime, setIniTime] = useState<String>("");
  const [endTime, setEndTime] = useState<String>("");



  const [selectedLanguage, setSelectedLanguage] = useState();
  const [typeEvent, setTypeEvent] = useState<Number>();


  /*
  TODO: datetimepicker is not compatible with web. So we'll add date and time picker separately
  */

  return(
    
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-white">
      <h1>Create Event</h1>
      
      <div className="flex flex-col">

        <TextInput
          onChangeText={setTitle}
          className="p-3 border rounded"
          placeholder="Titulo"
        />

        <TextInput
          onChangeText={setTitle}
          className="p-3 border rounded"
          placeholder="Descripción"
        />
        
        <TextInput placeholder="Año/Mes/Dia" onChangeText={setDate} className="p-3 border rounded"/>

        <div className="flex flex-row">
          <Text className="p-2 text-center grow">Tiempo inicial</Text>
          <Text className="p-2 text-center grow">Tiempo Final</Text>
        </div>
        
        <div className="flex flex-row">
          <TextInput placeholder="Hora:Minuto:Segundo" onChangeText={setIniTime} className="p-3 border rounded"/>
          <TextInput placeholder="Hora:Minuto:Segundo" onChangeText={setEndTime} className="p-3 border rounded"/>
        </div>

        <div className="p-3 border rounded">
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex)=>{
              setSelectedLanguage(itemValue);
              setTypeEvent(itemValue)
            }}>
              <Picker.Item label="Important" value={1}/>
              <Picker.Item label="Normal" value={2}/>
              <Picker.Item label="Irrelevant" value={3}/>
              <Picker.Item label="Flexible" value={4}/>
          </Picker>
        </div>
        <Button
          title="Crear Evento"
          onPress={()=>console.log()}
        />
      </div>
    </div>
  );
}