import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Home, Login, Register} from "./pages";
import { readToken } from "./storage/token";
import { SetTokenContext, TokenContext } from "./storage/TokenContext";

export default function App() {
  const Stack = createNativeStackNavigator();
  const client = new ApolloClient({
    uri: 'http://localhost:8080',
    cache: new InMemoryCache()
  });

  const [token, setToken] = useState<string | null | undefined >();
  setTimeout(() => {}, 1000);
  useEffect(() => {
    readToken().then((t) => {
      setToken(t || "");
    })
  }, []);

  //read if there is a token
  //TODO: add splash screen meanwhile read a token 

  return (
    <TokenContext.Provider value={token}>
      <SetTokenContext.Provider value={setToken}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: true
              }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register}/>
            </Stack.Navigator>
          </NavigationContainer>
        </ApolloProvider>
      </SetTokenContext.Provider>
    </TokenContext.Provider>
  );
}

