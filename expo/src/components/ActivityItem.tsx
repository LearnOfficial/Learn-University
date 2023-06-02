import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useGraphQLContext } from "../utils/context";

export type ActivityItemProps = {
  id: number;
  title: string;
  startDate?: Date;
  endDate?: Date;
  onDelete?: () => void;
};

const DELETE_ACTIVITY_QGL = gql`
mutation($deleteActivityId: Float!){
  deleteActivity(id: $deleteActivityId) {
    id
  }
}
`

export function ActivityItem({ id, title, startDate, endDate, onDelete: onDeleted }: ActivityItemProps) {
  const [onDeleteActivity, deletedActivity] = useMutation(DELETE_ACTIVITY_QGL, useGraphQLContext());
  // To convert milliseconds to minutes, divide by 60000 (60 seconds * 1000 milliseconds). 
  let duration = (endDate?.getTime()! - startDate?.getTime()!) / (1000 * 60);
  let textDuration = "min";

  if (duration > 60) {
    duration = duration / 60;
    textDuration = "hrs";
  }


  return (
    <TouchableOpacity className="flex flex-row items-center" style={{ gap: 12 }}
      onPress={async () => {
        await onDeleteActivity({ variables: { deleteActivityId: parseFloat(id as any) } });
        if(onDeleted){onDeleted()};
      }}
    >
      <View className="w-7 h-7 border rounded" />
      <View className="flex-row justify-between items-between" style={{ flex: 1 }}>
        <Text>{title} {id}</Text>
        <Text>{duration} {textDuration}</Text>
      </View>
    </TouchableOpacity>

  );
}
