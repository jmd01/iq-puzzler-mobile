import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import * as React from "react";
// import { useEffect, useState } from "react";
import { StyledSafeAreaView } from "../common/styles";
import { StatusBar } from "expo-status-bar";
// import { FullPageSpinner } from "../Spinner";

export const SafeWebView = () => {
  const insets = useSafeAreaInsets();

  return (
    <StyledSafeAreaView style={{ paddingTop: insets.top }}>
      <WebView
        source={{
          uri: "http://iq-puzzler.vercel.app/",
          // uri: "http://192.168.1.40:4000/",
        }}
        overScrollMode="never"
      />
      <StatusBar style="dark" />
    </StyledSafeAreaView>
  );
};
