import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Page } from "../../components/Page";
import { useGraphQLContext } from "../../utils/context";
import CreateActivity, { ActivityObject } from "../activity/CreateActivity";
import CreateEvent, { EventObject } from "../event/CreateEvent";

const CREATE_EVENT_GQL = gql`
mutation ($createEvent: EventInput!){
  createEvent(createEvent: $createEvent) {
    id
    title
    activity {
      id
      title
    }
  }
}
`

export function Notes() {
    const [onCreateEvent, eventCreated] = useMutation(CREATE_EVENT_GQL, useGraphQLContext());
    const [activities, setActivities] = useState<Array<ActivityObject>>([]);

    if(eventCreated.data){
        console.log(eventCreated.data);
    }

    return (
        <Page
            refreshing={false}
            onRefresh={() => { }}
        >
            <CreateEvent
                onSubmit={(event: EventObject) => {
                    const variables = {
                        createEvent: {
                            ...event,
                            activities: activities
                        }
                    };
                    onCreateEvent({variables: variables});
                }}
            />

            <CreateActivity
                isUnique={true}
                onSubmit={(activity: ActivityObject) => {
                    setActivities([
                        activity,
                        ...activities
                    ]);
                }}
            />
        </Page>
    );
}
