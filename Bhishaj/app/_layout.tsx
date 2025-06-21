import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../app/globals.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load all custom fonts here
  const [fontsLoaded] = useFonts({
    Fraunces: require("../assets/fonts/Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf"),
    "Fraunces-Italic": require("../assets/fonts/Fraunces-Italic-VariableFont_SOFT,WONK,opsz,wght.ttf"),
    "Cormorant-Regular": require("../assets/fonts/Cormorant-Regular.ttf"),
    "Cormorant-SemiBold": require("../assets/fonts/Cormorant-SemiBold.ttf"),
    "Cormorant-Bold": require("../assets/fonts/Cormorant-Bold.ttf"),
    // Add other fonts as needed
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Or a custom loading component
  }

  return (
    <Stack >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
