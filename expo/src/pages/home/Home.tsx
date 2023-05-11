import { gql, useQuery } from "@apollo/client";
import { useContext } from "react";
import { Button, View, Text } from "react-native";
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
