import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function DeleteActivity(){

  const [event, setEvent] = useState<String>("");
  const [title, setTitle] = useState<String>("");

  return(
    <View className='flex flex-col w-screen h-screen justify-center items-center bg-white'>
      <Text className='font-bold m-0.5'>ELIMINAR ACTIVIDAD</Text>
      <View className='flex flex-row m-0.5'>
        <View className='flex flex-col'>
          <TextInput className='p-3 border rounded m-0.5' onChangeText={setEvent} placeholder='Evento Padre'/>
          <TextInput className='p-3 border rounded m-0.5' onChangeText={setTitle} placeholder='Titulo de la Actividad'/>
        </View>

        <TouchableOpacity className='flex p-3 justify-center items-center' onPress={()=>console.log(event)}>
          <FontAwesome name="search" size={26} color="black"/>
        </TouchableOpacity>
      </View>

      <View className='flex flex-col m-0.5 w-1/2 border rounded items-stretch'>
        <View className='flex border rounded flex-row p-2 m-0.5'>
          <Text className='grow'> Contenido 1 </Text>
          <TouchableOpacity onPress={()=>console.log(title)}>
            <AntDesign className="flex grow-0" name="delete" size={26} color="red"/>
          </TouchableOpacity>
        </View>

        <View className='flex border rounded flex-row p-2 m-0.5'>
          <Text className='grow'> Contenido 2 </Text>
          <TouchableOpacity onPress={()=>console.log(title)}>
            <AntDesign className="flex grow-0" name="delete" size={26} color="red"/>
          </TouchableOpacity>
        </View>        
      </View>

    </View>
  );
}