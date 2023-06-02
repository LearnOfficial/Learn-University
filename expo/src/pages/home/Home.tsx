import { empty, gql, useQuery } from "@apollo/client";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { View } from "react-native";
import { ActivityItem } from "../../components/ActivityItem";
import { AddContainer } from "../../components/AddContainer";
import { EventItem } from "../../components/EventItem";
import { Page } from "../../components/Page";
import { Text } from "../../components/Text";
import { useGraphQLContext } from "../../utils/context";
import CreateEvent from "../event/CreateEvent";
import CreateActivity from "../activity/CreateActivity";

const EVENT_ACTIVITY_GQL = gql`
query{
  learner {
    events {
      id
      title
      startDate
      endDate
      activity {
        id
        title
        startDate
        endDate
      }
    }
  }
}
`;

// TODO: add type to navigation
export default function Home({ navigation }: any) {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, loading, error, refetch } = useQuery(EVENT_ACTIVITY_GQL, useGraphQLContext());
  console.log(useGraphQLContext().context.headers.Authorization);

  if (!data?.learner?.events || data?.learner?.events?.length == 0) {
    return (
      <Page refreshing={loading} onRefresh={() => { }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>No Hay Eventos</Text>
        </View>
      </Page>
    );
  }

  const events: [any] = data.learner.events;

  const Stack = createNativeStackNavigator();

  function HomeEvents({ navigation }) {
    return <Page
      refreshing={loading}
      onRefresh={refetch}
    >
      <>
        <AddContainer
          text={"Crear Nuevo Evento"}
          onPress={() => { navigation.navigate("CreateEvent") }}
        />
        {
          events.map((event: any, index) => {
            const activities: [] = event?.activity;
            return (
              <EventItem
                id={event.id}
                key={index}
                title={event.title}
                startDate={new Date(event.startDate)}
                endDate={new Date(event.endDate)}
                onDelete={() => { refetch() }}
              >
                <>
                  <AddContainer
                    text = {"Crear Nuevo Actividad"}
                    onPress={() => { navigation.navigate("CreateActivity") }}
                  />
                  {
                    activities.map((activity: any, index) => {
                      return (
                        <ActivityItem
                          id={activity.id}
                          key={index}
                          title={activity.title}
                          startDate={new Date(activity.startDate)}
                          endDate={new Date(activity.endDate)}
                          onDelete={() => { refetch() }}
                        />
                      );
                    })
                  }
                </>
              </EventItem>
            );
          })
        }
      </>
    </Page>
  }

  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Group>
        <Stack.Screen name="HomeEvents" component={HomeEvents} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="CreateEvent" component={CreateEvent} />
        <Stack.Screen name="CreateActivity" component={CreateActivity} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
