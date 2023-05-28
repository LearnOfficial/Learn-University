import { empty, gql, useQuery } from "@apollo/client";
import { Feather } from "@expo/vector-icons";
import { useContext } from "react";
import { Button, View, Text, TouchableOpacity, Image, SafeAreaView } from "react-native";
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

export default function Home({ navigation }: any) {
  const token = useContext(TokenContext);

  const { data, loading, error } = useQuery(HOME_GQL, {
    context: {
      headers: {
        Authorization: token
      }
    }
  });

  const setTokenContext = useContext(SetTokenContext);

  return (
    <View
      style={{ backgroundColor: "#FAFAFA" }}
      className="flex w-full h-full justify-center items-center"
    >
      <Text>Home</Text>
   </View>
  )
}
