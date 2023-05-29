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
import { Activity, Event, Home, LearningFile, Login, Register, Technique } from './pages';
import { useFonts } from 'expo-font';
import { Setting } from './pages/settings/Setting';
import { Header } from './components/Header';
import {  StatusBar, Text, View } from 'react-native';
import { COLORS } from './styles/colors';

export default function App() {

  const client = new ApolloClient({
    uri: 'http://192.168.21.11:4000',
    cache: new InMemoryCache()
  });

  const [token, setToken] = useState<string | null | undefined>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [fontLoaded] = useFonts({
    'Lexend': require('../assets/fonts/Lexend.ttf')
  });


  useEffect(() => {
    if (fontLoaded) {
      setIsLoaded(true);
    }
  }, [fontLoaded]);

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
        <Tab.Navigator
          initialRouteName='Setting'
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName: string = "";
              let color = "";
              let activeColor = COLORS.imagin[350];
              let disableColor = COLORS.creativity[350];
              switch (route.name) {
                case "Home":
                  iconName = "home";
                  color = focused ? activeColor: disableColor;
                  break;

                case "Notes":
                  iconName = "edit";
                  color = focused ? activeColor: disableColor;
                  break;
                case "Calendar":
                  iconName = "calendar";
                  color = focused ? activeColor: disableColor;
                  break;

                case "Activity":
                  iconName = "activity";
                  color = focused ? activeColor: disableColor;
                  break;

                case "Group":
                  iconName = "users";
                  color = focused ? activeColor: disableColor;
                  break;
 
                case "Setting":
                  iconName = "settings";
                  color = focused ? activeColor: disableColor;
                  break;
 
              }
              return <Feather 
                name={iconName as any}
                size={24}
                color={color == disableColor ? activeColor: disableColor}
                style={{backgroundColor: color, padding: 5, borderRadius: 5}}/>
            },
            tabBarStyle: {
              position: "absolute",
              marginHorizontal: "10%",
              height: 60,
              bottom: 10,
              borderRadius: 50, 
              backgroundColor: COLORS.creativity[350],
            },
            tabBarShowLabel: false,
            header: ({}) => {
              return <Header/>;
            }
          })}>
          <Tab.Screen name="Calendar" component={Technique} />
          <Tab.Screen name="Notes" component={Event} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Activity" component={LearningFile} />
          <Tab.Screen name="Setting" component={Setting} />
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
    <>
    <TokenContext.Provider value={token}>
      <SetTokenContext.Provider value={setToken}>
        <ApolloProvider client={client}>
          <Navigation />
        </ApolloProvider>
      </SetTokenContext.Provider>
    </TokenContext.Provider>
      <StatusBar/>
    </>
  );
}

