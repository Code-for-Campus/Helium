import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "Helium",
  slug: "helium",
  scheme: "helium",
  version: "1.0.0",
  orientation: "portrait",
  // icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  // ios: {
  //   bundleIdentifier: "your.bundle.identifier",
  //   supportsTablet: true,
  // },
  // android: {
  //   package: "your.bundle.identifier",
  //   adaptiveIcon: {
  //     foregroundImage: "./assets/icon.png",
  //     backgroundColor: "#FFFFFF",
  //   },
  // },
  // extra: {
  //   eas: {
  //     projectId: "your-eas-project-id",
  //   },
  // },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ["expo-router", "./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
