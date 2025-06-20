import { Text, View, SafeAreaView } from "react-native";
import GradientBackground from '../GradientBackground';

export default function Index() {
  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1, paddingBottom: 75 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="text-red-500 text-5xl">Hello Hello</Text>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}
