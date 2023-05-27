import 'react-native-gesture-handler';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { readToken } from "./storage/token";
import { SetTokenContext, TokenContext } from "./storage/TokenContext";
import { Feather } from "@expo/vector-icons";
import { SplashScreen } from './pages/splash_screen/SplashScreen';
import { Activity, Event, Home, LearningFile, Technique } from './pages';

export default function App() {

  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
  });

  const [token, setToken] = useState<string | null | undefined>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  setTimeout(() => {
    setIsLoaded(true);
  }, 2000);

  useEffect(() => {
    readToken().then((t) => {
      setToken(t || "");
    })
  }, []);

  //read if there is a token
  if (!isLoaded) {
    return <SplashScreen />
  }

  let Navigation;

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  if (token) {
    Navigation = () => {
      return <NavigationContainer>
        <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let Icon;
            if (route.name === "Home") {
              Icon = focused ?
                <Feather name="home" size={24} color={"blue"} /> :
                <Feather name="home" size={24} />
            }
            return Icon
          }
        })}>
          <Tab.Screen options={{ headerShown: false }} name="Technique" component={Technique} />
          <Tab.Screen options={{ headerShown: false }} name="Event" component={Event} />
          <Tab.Screen options={{ headerShown: false }} name="Home" component={Home} />
          <Tab.Screen options={{ headerShown: false }} name="LearningFile" component={LearningFile} />
          <Tab.Screen options={{ headerShown: false }} name="Activity" component={Activity} />
        </Tab.Navigator>
      </NavigationContainer>
    }
  } else {
    Navigation = function() {
      return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
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

