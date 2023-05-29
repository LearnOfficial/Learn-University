import { gql, useQuery } from "@apollo/client";
import { Feather } from "@expo/vector-icons";
import { useContext } from "react";
import { View, Text, Image } from "react-native";
import { saveToken } from "../storage/token";
import { SetTokenContext, TokenContext } from "../storage/TokenContext";
import { COLORS } from "../styles/colors";


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
export function Header({ navigation }: any) {
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
      className="flex px-2">

      <View className="flex flex-row w-full justify-between items-center h-16">
        <View className="flex flex-row">
          <Image style={{ width: 50, height: 50 }} source={require('../../assets/imgs/LearnIcon.png')} />
          <View className="flex">
            <Text style={{ fontFamily: "Lexend" }} className="font-bold">{data?.learner?.username}</Text>
            <Text style={{ fontFamily: "Lexend" }}>{data?.learner?.email}</Text>
          </View>
        </View>
        <Feather
          style={{
            padding: 5
          }}
          name="log-out"
          size={24}
          color={COLORS.creativity[350]}
          onPress={async () => {
            setTokenContext!("");
            await saveToken("");
          }}
        />
      </View>
    </View>
  )
}
