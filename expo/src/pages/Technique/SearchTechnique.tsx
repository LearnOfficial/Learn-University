import { gql, useQuery } from "@apollo/client";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { TokenContext } from "../../storage/TokenContext";

const USER_TECHNIQUES_GQL = gql`
query {
  learner {
    technique {
      id
      title
      breakTime
      focusTime
      interval
    }
  }
}
`

export default function SearchTechnique() {
  const token = useContext(TokenContext);
  
  const { data, loading, error } = useQuery(USER_TECHNIQUES_GQL, {
    context: { headers: { Authorization: token } }
  });

  const [title, setTitle] = useState<String>("");

  if (data) {
    const tecniques = data?.learner?.technique as [];
    
    return (
      <View className="flex flex-col w-screen h-screen justify-center items-center bg-white">
        <View className="flex flex-col">

          <View className="flex flex-row border rounded m-0.5">
            <TextInput className="p-3 border-r-2" placeholder="Titulo de la Técnica" onChangeText={setTitle} />
            <TouchableOpacity className='flex p-3 justify-center items-center' onPress={() => console.log()}>
              <FontAwesome name="search" size={26} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View className='flex flex-col m-0.5 w-1/2 border rounded items-stretch'>
            {
              tecniques.map((technique:any, index)=>{
                return(
                  <View className='flex flex-row border rounded p-2 m-0.5 items-center' key={index}>
                    <Text className='grow'> {technique.title} </Text>
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
    <View>
      <Text>No existen técnicas</Text>
    </View>
  )
}
