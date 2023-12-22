import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export const Index = () => {
    return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Home" }} />
      <View />
    </SafeAreaView>
  );
};

export default Index;
