import { TextInput } from "react-native";
import Button from "../../components/Button";
import { useState } from "react";

export default function CreateLearner(){

  const [fullname, setFullname] = useState<String>("");
  const [username, setUsername] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  return(
    <>
      <div className="flex flex-col w-screen h-screen justify-center items-center bg-white">
        <h1 className="p-5">Crear Estudiante</h1>
        <TextInput 
        onChangeText={setFullname}
        className="p-3 border rounded"
        placeholder="Nombre Completo"/>

        <TextInput 
        onChangeText={setUsername}
        className="p-3 border rounded"
        placeholder="Nombre de Usuario"/>

        <TextInput 
        onChangeText={setEmail}
        className="p-3 border rounded"
        placeholder="Correo Electronico"/>

        <TextInput 
        secureTextEntry
        onChangeText={setPassword}
        className="p-3 border rounded"
        placeholder="Contraseña"/>

        <Button title="Registrarse" onPress={()=>{console.log("hola")}}/>
      </div>
    </>
  );
}