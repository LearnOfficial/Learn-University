import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import Button from "../../components/Button";

// Displays the results of the query 'searchUser'
const DisplayUserInformation = () => {

}

export default function SearchStudent(){
  const [username, setUsername] = useState<string>("");

  return(
    <>
      <div className="flex flex-col w-screen h-screen justify-center items-center bg-white">
        <h1 className="p-5">Buscar Estudiante</h1>
        <TextInput
          onChangeText={setUsername}
          className="p-3 border rounded"
          placeholder="Nombre de usuario"
        />
        <Button 
          title="Buscar Estudiante"
          onPress={()=>console.log({username})}
          />
        
      </div>
    </>
  )

}