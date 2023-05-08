import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { saveToken } from "../../storage/token";

type ButtonProps = {
  title: string;
  onPress: any
};
const Button = ({ title, onPress }: ButtonProps) => (
  <TouchableOpacity
    className="flex justify-center items-center h-10 p-3 rounded bg-slate-900"
    onPress={onPress}
  >
    <Text
      className="text-slate-50 font-bold"
    >{title}</Text>
  </TouchableOpacity>
);

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
  const [onLogin, { data, loading, error }] = useMutation(LOGIN_GQL);

  if (data) {
    navigation.navigate("Home");
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

        <Button
          title="Login"
          onPress={() => {
            onLogin({
              variables: {
                loginInput: {
                  username: username,
                  password: password
                }
              }
            });
          }}
        />
      </View>
    </View>
  );
}
