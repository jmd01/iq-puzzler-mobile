import { ConfigContext, ExpoConfig } from "@expo/config";
import "dotenv/config";

// app.config not respecting tsconfig
// @see https://github.com/expo/expo-cli/issues/2782#issuecomment-1292857325
// NB: Keep in sync with environment.d.ts
interface ProcessEnv {
  APP_VARIANT: "development" | "preview" | "production";
  WEBVIEW_URL?: string;
}

const processEnv = process.env as ProcessEnv;
const APP_VARIANT = processEnv.APP_VARIANT ?? "";

const name = APP_VARIANT && APP_VARIANT !== "production" ? `IQ Puzzler - ${APP_VARIANT}` : "IQ Puzzler";
const bundleIdentifier = APP_VARIANT
  ? `com.jmd02.iqpuzzlermobile.${APP_VARIANT}`
  : "com.jmd02.iqpuzzlermobile";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name,
  slug: "iq-puzzler-mobile",
  version: "1.0.1",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0F0A2C",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundImage: "./assets/adaptive-icon-background.png",
    },
    package: bundleIdentifier,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    webviewUrl: processEnv.WEBVIEW_URL,
    environment: APP_VARIANT ?? "production",
    eas: {
      projectId: "0d232dd0-d5dc-4c1b-bdc2-733b23957987",
    },
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  updates: {
    url: "https://u.expo.dev/0d232dd0-d5dc-4c1b-bdc2-733b23957987",
  },
  plugins: [
    [
      "expo-av",
      {
        microphonePermission:
          "Allow $(PRODUCT_NAME) to access your microphone.",
      },
    ],
  ],
});
