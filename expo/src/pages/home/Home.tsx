import { empty, gql, useQuery } from "@apollo/client";
import { useContext } from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import { saveToken } from "../../storage/token";
import { SetTokenContext, TokenContext } from "../../storage/TokenContext";


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

export default function Home({ navigation }: any){
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
        <Text className="font-bold">Welcome to Learn!</Text>
        <Text>{data?.learner?.id}</Text>
        <Text>{data?.learner?.username}</Text>
        <Text>{data?.learner?.fullname}</Text>
        <Text>{data?.learner?.email}</Text>
      </View>
      <View className="flex flex-col gap-2">
        <TouchableOpacity>
          <Text className="p-2 rounded  font-bold text-white bg-red-600 ">
            Eliminar Aprendiz
          </Text>
        </TouchableOpacity>
        <Button
          title="Logout"
          onPress={async () => {
            setTokenContext!("");
            await saveToken("");
          }}
        />
      </View>
    </View>
  )
}
