import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Button from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { saveToken } from "../../storage/token";
import { SetTokenContext, TokenContext } from "../../storage/TokenContext";
import { COLORS } from "../../styles/colors";

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
    <View className="flex w-full h-full justify-center p-3 md:items-center" style={{ backgroundColor: "#FAFAFA" }}>

      <View className="flex flex-col md:w-96" style={{ gap: 12 }}>
        <TextInput
          placeholder="Nombre Usuario"
          onChange={setUsername}
        />

        <TextInput
          placeholder="Contraseña"
          onChange={setPassword}
        />

        <View className="flex flex-col" style={{gap: 12}}>
          <Button
            title="Iniciar Sesión"
            onPress={() => {
              if (username.length != 0 && password.length != 0) {
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

          <View className="flex flex-row" style={{gap: 7}}>
            <Text style={{fontFamily: "Lexend"}}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register")
              }}
            >
              <Text style={{fontFamily: "Lexend", fontWeight: "800", color: COLORS.creativity[350]}}>Sign up now</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View >
  );
}
