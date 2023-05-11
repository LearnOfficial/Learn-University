import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Home, Login, Register } from "./pages";
import { readToken } from "./storage/token";
import { SetTokenContext, TokenContext } from "./storage/TokenContext";
import { Feather } from "@expo/vector-icons";

export default function App() {

  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
  });

  const [token, setToken] = useState<string | null | undefined>();
  setTimeout(() => { }, 1000);
  useEffect(() => {
    readToken().then((t) => {
      setToken(t || "");
    })
  }, []);

  //read if there is a token
  //TODO: add splash screen meanwhile read a token 

  let Navigation;

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  if (token) {
    Navigation = function() {
      return (
      <NavigationContainer>
          <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({focused}) => {
              let Icon;
              if(route.name === "Home"){
                Icon = focused ? 
                  <Feather name="home" size={24} color={"blue"}/> :
                  <Feather name="home" size={24}/>
              }
              return Icon
            }
          })}>
            <Tab.Screen name="Home" component={Home}/>
          </Tab.Navigator>
      </NavigationContainer>
      );
    }
  } else {
    Navigation = function() {
      return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: true
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
  }


  return (
    <TokenContext.Provider value={token}>
      <SetTokenContext.Provider value={setToken}>
        <ApolloProvider client={client}>
          <Navigation />
        </ApolloProvider>
      </SetTokenContext.Provider>
    </TokenContext.Provider>
  );
}

