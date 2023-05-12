import {useState} from 'react'
import {View, TextInput, Text} from 'react-native'
import Button from '../../components/Button'

export default function CreateLearningFile(){
  
  const [fileName, setFileName] = useState<String>("")

  const [externalLink, setExternalLink] = useState<String>("")
  const [fileExtension, setFileExtension] = useState<String>("")

/*
TODO: add document picker
*/


  return(
    <View className='flex flex-col w-screen h-screen justify-center items-center bg-white'>
      <View className='flex flex-col'>
      <Text className='font-bold m-0.5 text-center'>Archivo Local</Text>

      <View className='flex flex-row border rounded m-0.5'>
        <TextInput className='p-3 ' placeholder='Nombre de Archivo' onChangeText={setFileName}/>
        <TextInput className='p-3 w-24 border-l-2' placeholder='Extensión' onChangeText={setFileExtension}/>
      </View>

      <Text className='font-bold m-0.5 text-center'>Archivo Externo</Text>
      <TextInput className='flex p-3 border rounded m-0.5' placeholder='URL de Archivo' onChangeText={setExternalLink}/>
      <Button title='Crear Archivo de Aprendizaje' onPress={()=>console.log(externalLink)}/>
      </View>
    </View>
  );
}