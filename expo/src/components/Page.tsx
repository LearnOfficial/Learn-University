import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../styles/colors";

type PageProps = {
  children: React.ReactNode
};

export function Page({ children }: PageProps) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: COLORS.imagin[350],
    }}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 10, padding: 10}}>
        {children}
        <View style={{ height: 60 }}></View>
      </ScrollView>
    </View>
  );
}
