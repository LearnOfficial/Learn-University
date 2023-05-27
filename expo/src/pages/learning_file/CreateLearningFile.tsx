import { gql, useMutation, useQuery } from '@apollo/client';
import { Picker } from '@react-native-picker/picker';
import { useContext, useState } from 'react'
import { View, TextInput, Text } from 'react-native'
import Button from '../../components/Button'
import { TokenContext } from '../../storage/TokenContext';

const CREATE_LEARN_FILE_GQL = gql`
  mutation($createLearningFile: LearningFileInput!) {
    createLearningFile(createLearningFile: $createLearningFile) {
      id
      fileName
    }
  }
`

const USER_EVENTS_GQL = gql`
  query {
    learner {
      events {
        id
        title
        activity {
          id
          title
        }
      }
    }
}`



export default function CreateLearningFile() {
  const token = useContext(TokenContext);
  const context = { context: { headers: { Authorization: token } } }
  const [onCreateLearningFile, createLearningFileMutation] = useMutation(CREATE_LEARN_FILE_GQL, {
    ...context
  });

  const eventQuery = useQuery(USER_EVENTS_GQL, {
    ...context
  });

  let events: Array<any>;
  let activities: Array<any>;

  const [eventId, setEventId] = useState<number>(0);
  const [activityId, setAcivityId] = useState<number>(0);

  if (eventQuery.data) {
    const learner = eventQuery.data?.learner;
    events = learner?.events || [];
    activities = events[eventId - 1]?.activity || [];
  }

  const [fileName, setFileName] = useState<String>("")


  const [externalLink, setExternalLink] = useState<String>("")
  const [format, setFormat] = useState<String>("")

  // TODO: add document picker

  return (
    <View className='flex flex-col w-screen h-screen justify-center items-center bg-white'>

      <Picker
        className="p-3 border"
        selectedValue={eventId}
        onValueChange={(value) => {
          setEventId(value);
        }}
      >
        <Picker.Item label="No seleccionado" value={0} />
        {
          events! &&
          events.map((technique: any, index: number) => {
            return <Picker.Item key={index} label={technique.title} value={technique.id} />
          })
        }
      </Picker>

      <Picker
        className="p-3 border"
        selectedValue={activityId}
        onValueChange={(value) => {
          setAcivityId(value);
        }}
      >
        <Picker.Item label="No seleccionado" value={0} />
        {
          activities! &&
          activities.map((technique: any, index: number) => {
            return <Picker.Item key={index} label={technique.title} value={technique.id} />
          })
        }
      </Picker>




      <View className='flex flex-col'>
        <Text className='font-bold m-0.5 text-center'>Archivo Local</Text>

        <View className='flex flex-row border rounded m-0.5'>
          <TextInput className='p-3 ' placeholder='Nombre de Archivo' onChangeText={setFileName} />
          <TextInput className='p-3 w-24 border-l-2' placeholder='Extensión' onChangeText={setFormat} />
        </View>

        <Text className='font-bold m-0.5 text-center'>Archivo Externo</Text>
        <TextInput className='flex p-3 border rounded m-0.5' placeholder='URL de Archivo' onChangeText={setExternalLink} />

        <Button
          title='Crear Archivo de Aprendizaje'
          onPress={() => {
            onCreateLearningFile({
              variables: {
                createLearningFile: {
                  fileName: fileName,
                  format: format,
                  eventId: eventId != 0 ? parseInt(eventId as any): undefined,
                  activityId: activityId != 0 ? parseInt(activityId as any): undefined,
                  externalLink: externalLink || undefined
                }
              }
            })
          }} />
      </View>
    </View>
  );
}
