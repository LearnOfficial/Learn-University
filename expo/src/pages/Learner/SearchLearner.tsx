import { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 

export default function SearchLearner(){
  const [username, setUsername] = useState<string>("");

  return(
    <View className="flex flex-col w-screen h-screen justify-center items-center bg-white">
      <View className="flex flex-col">
        <View className="flex flex-row border rounded m-0.5">
          <TextInput
            onChangeText={setUsername}
            className="p-3 border-r-2"
            placeholder="Nombre de usuario"
          />
          <TouchableOpacity className='flex p-3 justify-center items-center' onPress={() => console.log()}>
            <FontAwesome name="search" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-col m-0.5 w-1/2 border rounded items-stretch">
        <View className='border rounded p-2 m-0.5'>
          <Text className='grow'> Contenido 1 </Text>
        </View>  
      </View>
    </View>
  )

}