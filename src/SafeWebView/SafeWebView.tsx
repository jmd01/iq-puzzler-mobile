import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import * as React from "react";
// import { useEffect, useState } from "react";
import { StyledSafeAreaView } from "../common/styles";
import { StatusBar } from "expo-status-bar";
// import { FullPageSpinner } from "../Spinner";

export const SafeWebView = () => {
  const insets = useSafeAreaInsets();

  // const [isWebviewLoaded, setIsWebviewLoaded] = useState(false);

  // To avoid a white screen being shown whilst the webview loads we show a spinner which is hidden on receiving the postMessage webviewLoaded event
  // The effect is a failsafe to ensure webview is still shown if postMessage webviewLoaded event isn't fired
  // e.g. if the webviewLoaded postMessage code in deskpro-product were deleted at some point in the future
  // native apps will never get pass the loading spinner
  // useEffect(() => {
  //   const timeout = setTimeout(() => setIsWebviewLoaded(true), 1000 * 15);
  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <StyledSafeAreaView style={{ paddingTop: insets.top }}>
      <WebView
        source={{
          uri: "https://iq-puzzler.vercel.app",
        }}
        overScrollMode="never"
      />
      {/* {!isWebviewLoaded && <FullPageSpinner />} */}
      <StatusBar style="dark" />
    </StyledSafeAreaView>
  );
};
