import {useState} from 'react';
import { FontAwesome } from '@expo/vector-icons'; 
import { TouchableOpacity, TextInput } from "react-native";

export default function SearchEvent(){

  const[title, setTitle] = useState<String>("")

  return(
    <div className='flex flex-col p-3 w-screen h-screen justify-center items-center bg-white'>
      <h1>Search Event</h1>
      <div className='flex flex-row w-3/6 '>
        <TextInput 
          className='p-3 border rounded m-2 grow'
          onChangeText={setTitle}
          placeholder="Titulo Evento"
        />

        <TouchableOpacity className='p-3' onPress={()=>console.log(title)}>
          <FontAwesome name="search" size={26} color="black"/>
        </TouchableOpacity>
      </div>
    
      <div className='border rounded w-3/6 h-3/6 justify-center'>
        <div className='flex justify-center'>Evento 1</div>
        <div className='flex justify-center'>Evento 2</div>
      </div>
    </div>
  );
}