import { AntDesign, FontAwesome } from '@expo/vector-icons';
import {useContext, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { TokenContext } from '../../storage/TokenContext';
import { gql, useQuery } from '@apollo/client';

const USER_ACTIVITIES_GQL=gql`
query{
  learner {
    events {
      id, title
    }
  }
}
`


export default function SearchActivity(){

  const token = useContext(TokenContext);
  const {data, loading, error} = useQuery(USER_ACTIVITIES_GQL, {
    context:{headers: { Authorization: token }}
  });
  
  const [event, setEvent] = useState<String>("");
  const [title, setTitle] = useState<String>("");


  if(data){
    const activities = data?.learner?.events?.activity as [];
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
           {
            activities?.map((activity: any, index) => {
              return (
                <View className='flex flex-row border rounded p-2 m-0.5 items-center' key={index} >
                  <Text className="grow">{activity.title}</Text>
                  <TouchableOpacity onPress={()=>console.log(title)}>
                    <AntDesign className="grow-0" name="delete" size={26} color="red"/>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
      </View>
    );
  }
  
  return (
    <View className='flex w-screen h-screen justify-center items-center'>
      <Text>No existen Actividades</Text>
    </View>
  )
  
}