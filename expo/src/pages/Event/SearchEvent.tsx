import {useState} from 'react';
import { FontAwesome } from '@expo/vector-icons'; 
import { TouchableOpacity, TextInput, View, Text } from "react-native";

export default function SearchEvent(){

  const[title, setTitle] = useState<String>("")

  return(
    <View className='flex flex-col p-3 w-screen h-screen justify-center items-center bg-white'>
      <View className='flex flex-row w-3/6 '>
        <TextInput 
          className='p-3 border rounded m-2 grow'
          onChangeText={setTitle}
          placeholder="Titulo Evento"
        />

        <TouchableOpacity className='p-3' onPress={()=>console.log(title)}>
          <FontAwesome name="search" size={26} color="black"/>
        </TouchableOpacity>
      </View>
    
      <View className='border rounded w-3/6 h-3/6 justify-center'>
        <View className='flex justify-center'>Evento 1</View>
        <View className='flex justify-center'>Evento 2</View>
      </View>
    </View>
  );
}