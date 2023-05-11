import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function DeleteTechnique(){
  
  const [title, setTitle] = useState<String>("")

  return(
    <View className="flex flex-col w-screen h-screen justify-center items-center bg-white">
            <Text className="font-bold m-0.5">ELIMINAR TÉCNICA</Text>
      <View className="flex flex-col">

        <View className="flex flex-row border rounded m-0.5">
          <TextInput className="p-3 border-r-2" placeholder="Titulo de la Técnica" onChangeText={setTitle}/>
          <TouchableOpacity className='flex p-3 justify-center items-center' onPress={()=>console.log()}>
            <FontAwesome name="search" size={26} color="black"/>
          </TouchableOpacity>
        </View>

        <View className='flex flex-col m-0.5 border rounded items-stretch'>
          <View className='flex flex-row border rounded p-2 m-0.5'>
            <Text className='flex grow items-center'> Contenido 1 </Text>
            <TouchableOpacity onPress={()=>console.log(title)}>
              <AntDesign className="flex grow-0" name="delete" size={26} color="red"/>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
}