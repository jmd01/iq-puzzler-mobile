import { SafeWebView } from "./src/SafeWebView";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeWebView />
    </SafeAreaProvider>
  );
}
