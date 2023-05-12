import { gql, useQuery } from '@apollo/client';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { TokenContext } from '../../storage/TokenContext';

const USER_EVENTS_GQL = gql`
  query{
    learner {
      events {
        id
        title
        activity{
          id
          title
        }
      }
    }
  }
`

export default function SearchActivity() {
  const token = useContext(TokenContext);
  const context = { context: { headers: { Authorization: token } } };
  const eventQuery = useQuery(USER_EVENTS_GQL, {
    ...context
  });


  const [eventId, setEventId] = useState<number>(1);
  const [title, setTitle] = useState<String>("");

  if (eventQuery.data) {
    const events = eventQuery.data?.learner?.events as [];
    const activities = events[parseInt(eventId as any)-1]?.activity;

    return (
      <View className='flex flex-col w-screen h-screen justify-center items-center bg-white'>
        <View className='flex flex-row border m-0.5'>
          <View className='flex flex-col'>

            <Picker
              className="p-3"
              selectedValue={eventId}
              onValueChange={(value) => {
                setEventId(value);
              }}
            >
              {
                eventQuery.data &&
                events.map((event: any, index: number) => {
                  return <Picker.Item key={index} label={event.title} value={event.id} />
                })
              }
            </Picker>


            <TextInput className='p-3 border-r' onChangeText={setTitle} placeholder='Titulo de la Actividad' />
          </View>

          <TouchableOpacity className='flex p-3 justify-center items-center' onPress={() => console.log(eventId)}>
            <FontAwesome name="search" size={26} color="black" />
          </TouchableOpacity>
        </View>

        <View className='flex flex-col border rounded items-stretch'>
          {
            activities &&
            activities.map((activity: any, index: number) => {
              return (
                <View key={index} className='flex flex-row border rounded p-2 m-0.5 items-center'>
                  <Text className='grow'>{activity?.title}</Text>
                  <TouchableOpacity onPress={() => console.log(title)}>
                    <AntDesign className="grow-0" name="delete" size={26} color="red"/>
                  </TouchableOpacity>
                </View>
              );
            })
          }
        </View>

      </View>
    );
  }
}
