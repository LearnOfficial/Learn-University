import { View } from "react-native";
import { ScrollView, RefreshControl}  from "react-native";
import { COLORS } from "../styles/colors";

type PageProps = {
  refreshing?: boolean;
  onRefresh: () => void;
  children: React.ReactNode;
};

export function Page({ children, refreshing, onRefresh }: PageProps) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: COLORS.imagin[350],
    }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing!} onRefresh={onRefresh} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}>
        {children}
        <View style={{ height: 60 }}></View>
      </ScrollView>
    </View>
  );
}
