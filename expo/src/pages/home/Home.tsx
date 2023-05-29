import { empty, gql, useQuery } from "@apollo/client";
import { useContext } from "react";
import {  View, Text } from "react-native";
import { SetTokenContext, TokenContext } from "../../storage/TokenContext";
import { COLORS } from "../../styles/colors";


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
      style={{ backgroundColor: COLORS.imagin[350]}}
      className="flex w-full h-full justify-center items-center"
    >
      <Text>Home</Text>
   </View>
  )
}
