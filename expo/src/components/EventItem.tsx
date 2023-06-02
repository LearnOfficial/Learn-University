import { gql, useMutation } from "@apollo/client";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useGraphQLContext } from "../utils/context";
import { Text } from "./Text";

export type EventItemProps = {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  children: React.ReactNode[];
  onDelete?: () => void
};

const DELETE_EVENT_GQL = gql`
mutation($deleteEventId: Float!){
  deleteEvent(id: $deleteEventId){
    id
  }
}`

export function EventItem({
  id,
  title,
  startDate,
  endDate,
  children,
  onDelete
}: EventItemProps) {
  const [onDeleteEvent, deletedEvent] = useMutation(DELETE_EVENT_GQL, useGraphQLContext());

  if (deletedEvent.data) {
    if (onDelete) { onDelete() };
  }

  return (
    <View className="flex p-3 border rounded" style={{ gap: 12 }}>
      <View className="flex-row justify-between" style={{ flex: 1 }}>
        <Text>{title}</Text>
        <TouchableOpacity onPress={async () => {
          await onDeleteEvent({ variables: { deleteEventId: parseInt(id as any) } });
        }}>
          <Feather size={20} name="x-circle" />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-between" style={{ gap: 7 }}>
        <Text>{`Start: ${startDate.getDate()} ${startDate.toLocaleString('locale', { month: "long" })} ${startDate.getHours()}`}</Text>
        <Text>{`End: ${endDate.getDate()} ${endDate.toLocaleString('locale', { month: "long" })} ${endDate.getHours()}`}</Text>
      </View>
      <View style={{ gap: 12 }}>
        {children}
      </View>
    </View>

  );
}
