import { empty, gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { View } from "react-native";
import { ActivityItem } from "../../components/ActivityItem";
import { EventItem } from "../../components/EventItem";
import { Page } from "../../components/Page";
import { Text } from "../../components/Text";
import { useGraphQLContext } from "../../utils/context";
import CreateEvent from "../event/CreateEvent";

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
          <Text>No Events</Text>
        </View>
      </Page>
    );
  }

  const events: [] = data.learner.events;

  return (
    <Page
      refreshing={loading}
      onRefresh={refetch}
    >
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
            </EventItem>
          );
        })
      } 
    </Page>
  )
}
