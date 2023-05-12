import { FontAwesome } from '@expo/vector-icons';
import {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function SearchActivity(){

  const [event, setEvent] = useState<String>("");
  const [title, setTitle] = useState<String>("");

  return(
    <View className='flex flex-col w-screen h-screen justify-center items-center bg-white'>
      <View className='flex flex-row border m-0.5'>
        <View className='flex flex-col'>
          <TextInput className='p-3 border-b border-r ' onChangeText={setEvent} placeholder='Evento Padre'/>
          <TextInput className='p-3  border-r ' onChangeText={setTitle} placeholder='Titulo de la Actividad'/>
        </View>

        <TouchableOpacity className='flex p-3 justify-center items-center' onPress={()=>console.log(event)}>
          <FontAwesome name="search" size={26} color="black"/>
        </TouchableOpacity>
      </View>

      <View className='flex flex-col m-0.5 w-1/2 border rounded items-stretch'>
        <View className='border rounded p-2 m-0.5'>
          <Text className='grow'> Contenido 1 </Text>
        </View>

        <View className='border rounded p-2 m-0.5'>
          <Text className='grow'> Contenido 2 </Text>
        </View>        
      </View>

    </View>
  );
}