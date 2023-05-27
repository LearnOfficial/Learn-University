import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { gql, useQuery } from "@apollo/client";
import { TokenContext } from "../../storage/TokenContext";


const USER_LEARNINGFILES_GQL = gql`
query{
  learner {
    events {
      learningFile {
        id
        fileName
      }
    }
  }
}
`


export default function SearchLearningFile(){

  const token = useContext(TokenContext);
  
  const { data, loading, error } = useQuery(USER_LEARNINGFILES_GQL, {
    context: { headers: { Authorization: token } }
  });

  const [title, setTitle]= useState<String>('');
  const [event, setEvent]= useState<String>('');
  const [activity, setActivity]= useState<String>('');
  const [fileName, setFileName]= useState<String>('');
  const [fileExtension, setFileExtension]= useState<String>('');

  if(data){
    const learnFiles = data?.learner?.events?.learningFile as [];
    return(
      <View className='flex flex-col w-screen h-screen justify-center items-center bg-white'>
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
              {
                learnFiles?.map((learnFile:any, index)=>{
                  return(
                    <View className='flex flex-row border rounded p-2 m-0.5 items-center' key={index}>
                      <Text className='grow'> {learnFile.title} </Text>
                      <TouchableOpacity onPress={()=>console.log(title)}>
                        <AntDesign className="grow-0" name="delete" size={26} color="red"/>
                      </TouchableOpacity>
                    </View>
                  )
                })
              }
          </View>
        </View>
      </View>
    );
  }

  return (
    <View>
      <Text>No existen Archivos de Aprendizaje</Text>
    </View>
  )
}