import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";



type ButtonProps = {
  title: string;
  onPress: any
};
const Button = ({ title, onPress }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={styleButton.buttonView}
  >
    <Text>{title}</Text>
  </TouchableOpacity>
);

const styleButton = StyleSheet.create({
  buttonView: {
    alignSelf: 'stretch',
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  }
});

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

  if(data){
    navigation.navigate("Home");
  }

  return (
    <View style={styles.inputView}>
      <View style={styles.loginInputView}>
        <TextInput
          style={styles.loginInput}
          placeholder="username"
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.loginInput}
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

const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginInputView: {
    flex: 1,
    gap: 10,
    width: 200,
    maxHeight: 100,
  },
  loginInput: {
    padding: 10,
    border: "1px solid black",
    borderRadius: 5
  }
});
