import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

export default function DeleteLearningFile(){

const [title, setTitle]= useState<String>('');
const [event, setEvent]= useState<String>('');
const [activity, setActivity]= useState<String>('');
const [fileName, setFileName]= useState<String>('');
const [fileExtension, setFileExtension]= useState<String>('');


  return(
    <View className='flex flex-col w-screen h-screen justify-center items-center bg-white'>
      <Text className="font-bold m-0.5">ELIMINAR ARCHIVO DE APRENDIZAJE</Text>

      <View className='flex flex-col'>

        <View className='flex flex-row border rounded'>

          <View className='flex flex-col'>
            <TextInput className='p-3 border-b-2' placeholder='Evento Padre' onChangeText={setEvent}/>
            <TextInput className='p-3 border-b-2' placeholder='Actividad Padre' onChangeText={setActivity}/>
            <View className='flex flex-row'>
              <TextInput className='p-3' placeholder='Nombre de Archivo' onChangeText={setFileName}/>
              <TextInput className='p-3 border-l-2' placeholder='Extensión' onChangeText={setFileExtension}/>  
            </View>
          </View>

          <TouchableOpacity className='p-3 justify-center items-center border-l-2' onPress={()=>console.log(title)}>
            <FontAwesome name='search' size={26} color='black'/>
          </TouchableOpacity>
        </View>

        <View className='flex flex-col m-2 border rounded items-stretch'>
          <View className='border rounded flex-row p-2 m-0.5'>
            <Text className='grow'> Contenido 1 </Text>
            <TouchableOpacity onPress={()=>console.log(title)}>
              <AntDesign className="flex grow-0" name="delete" size={26} color="red"/>
            </TouchableOpacity>
          </View>

          <View className='border rounded flex-row p-2 m-0.5'>
            <Text className='grow'> Contenido 2 </Text>
            <TouchableOpacity onPress={()=>console.log(title)}>
              <AntDesign className="flex grow-0" name="delete" size={26} color="red"/>
            </TouchableOpacity>
          </View>        
        </View>

      </View>
    </View>
  );
}