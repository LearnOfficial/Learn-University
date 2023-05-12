import { empty, gql, useQuery } from "@apollo/client";
import { useContext } from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import { saveToken } from "../../storage/token";
import { SetTokenContext, TokenContext } from "../../storage/TokenContext";
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as ALL from '../index';
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons, Feather, MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons'; 


const HOME_GQL = gql`
  query {
    learner {
      id
      fullname
      email
      username
    }
  }
`;

// TODO: add type to navigation

function Content({ navigation }: any){
  const token = useContext(TokenContext);

  const {data, loading, error} = useQuery(HOME_GQL, {
    context: {
      headers: {
        Authorization: token
      }
    }
  });

  const setTokenContext = useContext(SetTokenContext);

  return (
    <View className="flex w-screen h-screen gap-10 justify-center items-center">
      <View className="flex">
        <Text>Welcome to Learn</Text>
        <Text>{data?.learner?.id}</Text>
        <Text>{data?.learner?.username}</Text>
        <Text>{data?.learner?.fullname}</Text>
        <Text>{data?.learner?.email}</Text>
      </View>
      <Button
        title="Logout"
        onPress={async () => {
          setTokenContext!("");
          await saveToken("");
        }}
      />
    </View>
  )
}



export default function Home() {
  function CustomDrawerContent({ navigation }:any) {
    return (
      <ScrollView>
        <TouchableOpacity className="p-3 justify-center items-center border-b-2" onPress={()=>{navigation.navigate('Inicio')}}>
          <FontAwesome5 name="home" size={24} color="blue" />
        </TouchableOpacity>
        <View className="flex flex-row items-center justify-center">
          <Ionicons name="ios-add-circle-outline" size={24} color="blue" />
          <Text className="p-3 font-bold grow text-center border-b">CREAR</Text>
        </View>

        <Text onPress={()=>{navigation.navigate('Crear Técnica')}} className="p-2 font-medium grow text-left indent-5">Técnica</Text>
        <Text onPress={()=>{navigation.navigate('Crear Evento')}} className="p-2 font-medium grow text-left indent-5">Evento</Text>
        <Text onPress={()=>{navigation.navigate('Crear Actividad')}} className="p-2 font-medium grow text-left indent-5">Actividad</Text>
        <Text onPress={()=>{navigation.navigate('Crear Archivo de Aprendizaje')}} className="p-2 font-medium grow text-left indent-5">Archivos de Aprendizaje</Text>

        <View className="flex flex-row items-center justify-center">
          <MaterialIcons name="update" size={24} color="blue" />
          <Text className="p-3 font-bold grow text-center border-b">ACTUALIZAR</Text>
        </View>

        <Text onPress={()=>{navigation.navigate('Actualizar Aprendiz')}} className="p-2 font-medium grow text-left indent-5">Aprendiz</Text>
        <Text onPress={()=>{navigation.navigate('Actualizar Técnica')}} className="p-2 font-medium grow text-left indent-5">Técnica</Text>
        <Text onPress={()=>{navigation.navigate('Actualizar Evento')}} className="p-2 font-medium grow text-left indent-5">Evento</Text>
        <Text onPress={()=>{navigation.navigate('Actualizar Actividad')}} className="p-2 font-medium grow text-left indent-5">Actividad</Text>

        <View className="flex flex-row items-center justify-center">
          <Feather name="search" size={24} color="blue" />
          <AntDesign name="delete" size={24} color="blue" />
          <Text className="p-3 font-bold grow text-center border-b">BUSCAR / ELIMINAR</Text>
        </View>

        <Text onPress={()=>{navigation.navigate('Buscar Técnica')}} className="p-2 font-medium grow text-left indent-5">Técnica</Text>
        <Text onPress={()=>{navigation.navigate('Buscar Evento')}} className="p-2 font-medium grow text-left indent-5">Evento</Text>
        <Text onPress={()=>{navigation.navigate('Buscar Actividad')}} className="p-2 font-medium grow text-left indent-5">Actividad</Text>
        <Text onPress={()=>{navigation.navigate('Buscar Archivo de Aprendizaje')}}className="p-2 font-medium grow text-left indent-5">Archivos de Aprendizaje</Text>

      </ScrollView>
    );
  }
  const Drawer = createDrawerNavigator();
  return(
    <Drawer.Navigator  drawerContent={(props) => <CustomDrawerContent {...props} />}
     screenOptions={{headerTransparent:true}} useLegacyImplementation initialRouteName="Inicio">

      <Drawer.Screen name="Inicio" component={Content} />
      <Drawer.Screen name="Actualizar Aprendiz" component={ALL.UpdateLearner} />
      <Drawer.Screen name="Inactivar Aprendiz" component={ALL.InactivateLearner} />

      <Drawer.Screen name="Crear Técnica" component={ALL.CreateTechnique} />
      <Drawer.Screen name="Actualizar Técnica" component={ALL.UpdateTechnique} />
      <Drawer.Screen name="Buscar Técnica" component={ALL.SearchTechnique} />
      
      <Drawer.Screen name="Crear Evento" component={ALL.CreateEvent} />
      <Drawer.Screen name="Actualizar Evento" component={ALL.UpdateEvent} />
      <Drawer.Screen name="Buscar Evento" component={ALL.SearchEvent} />

      <Drawer.Screen name="Crear Actividad" component={ALL.CreateActivity} />
      <Drawer.Screen name="Actualizar Actividad" component={ALL.UpdateActivity} />
      <Drawer.Screen name="Buscar Actividad" component={ALL.SearchActivity} />
      
      <Drawer.Screen name="Crear Archivo de Aprendizaje" component={ALL.CreateLearningFile} />
      <Drawer.Screen name="Buscar Archivo de Aprendizaje" component={ALL.SearchLearningFile} />

    </Drawer.Navigator>
  );
}
