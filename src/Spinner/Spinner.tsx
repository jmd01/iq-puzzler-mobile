import * as React from "react";
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
} from "react-native";

export interface SpinnerProps {
  size?: ActivityIndicatorProps["size"];
}
const color = "#0b012f";
export function Spinner({ size = "large" }: SpinnerProps) {
  return <ActivityIndicator size={size} color={color} />;
}

export function FullPageSpinner({ size = 60 }: SpinnerProps) {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <Spinner size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "white",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  vertical: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
});
