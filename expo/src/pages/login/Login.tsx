import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { TextInput, View } from "react-native";
import Button from "../../components/Button";
import { saveToken } from "../../storage/token";
import { SetTokenContext, TokenContext } from "../../storage/TokenContext";

const LOGIN_GQL = gql`
  mutation($loginInput: LearnerLogInInput!){ 
  readLearner(loginInput: $loginInput) {
    token
  }
}
`;

export default function Login({ navigation }) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const token = useContext(TokenContext);
  const setTokenContext = useContext(SetTokenContext);
  const [onLogin, { data, loading, error }] = useMutation(LOGIN_GQL);

  if (data) {
    const newToken = data.readLearner.token;
    (async () => {
      await saveToken(newToken);
    })();
    setTokenContext!(newToken);
  }

  return (
    <View className="flex w-screen h-screen justify-center items-center bg-white">
      <View className="flex w-64 h-64 gap-3">
        <View className="flex" />
        <TextInput
          className="block p-3 border rounded"
          placeholder="username"
          onChangeText={setUsername}
        />
        <TextInput
          className="p-3 border rounded"
          placeholder="password"
          secureTextEntry
          onChangeText={setPassword}
        />

        <View className="flex flex-row">
          <Button
            title="Login"
            onPress={() => {
              if(username.length!=0 && password.length != 0){
                onLogin({
                  variables: {
                    loginInput: {
                      username: username,
                      password: password
                    }
                  }
                });
              }
            }}
          />

          <Button
            title="Register"
            onPress={() => {
              navigation.navigate("Register")
            }}
          />
        </View>
      </View>
    </View>
  );
}
