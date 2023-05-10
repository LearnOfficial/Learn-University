import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import  * as ALL from "./layout";

export default function App() {
  const Stack = createNativeStackNavigator();
  const client = new ApolloClient({
    uri: 'http://localhost:8080',
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true
          }}
        >
          <Stack.Screen name="verifying..." component={ALL.DeleteEvent} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

