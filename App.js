import { View, Text, SafeAreaView } from "react-native";
import CommitHistogramChart from "./src/components/CommitHistogramChart"

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
        <Text>Technical Exercise Davydov</Text>
        <CommitHistogramChart />
    </SafeAreaView>
  );
}
