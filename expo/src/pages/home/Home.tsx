import { useContext } from "react";
import { Button, View , Text} from "react-native";
import { saveToken } from "../../storage/token";
import { SetTokenContext, TokenContext } from "../../storage/TokenContext";

// TODO: add type to navigation
export default function Home({ navigation }: any) {
  const token = useContext(TokenContext);
  const setTokenContext = useContext(SetTokenContext);

  return (
    <View className="flex w-screen h-screen gap-10 justify-center items-center">
      <View className="flex">
        <Text>Welcome to Learn</Text>
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
