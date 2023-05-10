import { useState } from "react";
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import { TextInput, TouchableOpacity, Text } from "react-native";

export default function DeleteEvent(){
  const [title, setTitle] = useState<String>("");

  return(
    <div>
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
        
          <div className='flex flex-col border rounded w-3/6 h-3/6'>
            <div className="flex flex-row">
              <Text className="flex grow">Evento 1</Text>
              <TouchableOpacity onPress={()=>console.log(title)}>
                <AntDesign className="flex grow-0" name="delete" size={26} color="red"/>
              </TouchableOpacity>
            </div>

            <div className="flex flex-row">
              <Text className="flex grow">Evento 2</Text>
              <TouchableOpacity onPress={()=>console.log(title)}>
                <AntDesign className="flex grow-0" name="delete" size={26} color="red"/>
              </TouchableOpacity>
            </div>
            
          </div>
        </div>
      );
    </div>
  );
}