
import {TouchableOpacity, Text} from "react-native";

export default function InactivateLearner(){
  return(
    <div className="flex w-screen h-screen justify-center items-center bg-white">
      <TouchableOpacity
        className="flex justify-center items-center h-10 p-3 m-1 rounded bg-red-600"
        onPress={()=>{console.log()}}
      >
        <Text className="text-slate-50 p-6 font-bold">Eliminar Usuario Actual</Text>
      </TouchableOpacity>
    </div>
  );
}