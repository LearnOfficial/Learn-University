import { useContext, useState } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, TextInput, View, Text } from "react-native";
import { TokenContext } from '../../storage/TokenContext';
import { gql, useQuery } from '@apollo/client';

const USER_EVENTS_GQL = gql`
  query{
    learner {
      events {
        id
        title
        description
        type
        startDate
        endDate
      }
    }
  }
`

export default function SearchEvent() {
  const token = useContext(TokenContext);
  const { data, loading, error } = useQuery(USER_EVENTS_GQL, {
    context: { headers: { Authorization: token } }
  });

  const [title, setTitle] = useState<String>("")

  if (data) {
    const events = data?.learner?.events as [];
    return (
      <View className='flex flex-col p-3 w-screen h-screen justify-center items-center bg-white'>
        <View className='flex flex-row w-3/6 '>
          <TextInput
            className='p-3 border rounded m-2 grow'
            onChangeText={setTitle}
            placeholder="Titulo Evento"
          />

          <TouchableOpacity className='p-3' onPress={() => console.log(title)}>
            <FontAwesome name="search" size={26} color="black" />
          </TouchableOpacity>
        </View>

        <View className='flex flex-col m-0.5 w-1/2 border rounded items-stretch'>
          {
            events.map((event: any, index) => {
              return (
                <View className='flex flex-row border rounded p-2 m-0.5 items-center' key={index} >
                  <Text className="grow">{event.title}</Text>
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
      <Text>No existen eventos</Text>
    </View>
  )
}
