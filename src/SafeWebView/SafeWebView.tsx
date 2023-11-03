import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import * as React from "react";
import { StyledSafeAreaView } from "../common/styles";
import { StatusBar } from "expo-status-bar";
import { Audio } from "expo-av";

const uri = process.env.WEBVIEW_URI ?? "https://iq-puzzler.vercel.app";

const injectedJavaScriptBeforeContentLoaded = `
  window.IQ_IS_WEBVIEW=true;
  true; // note: this is required, or you'll sometimes get silent failures
`;

const paths = [
  "transform",
  "drop",
  "over-board",
  "place",
  "level-complete",
  "confetti",
  "button-click",
  "button-hover",
];

export const SafeWebView = () => {
  const insets = useSafeAreaInsets();

  const [sounds, setSounds] =
    React.useState<Record<string, Audio.SoundObject>>();

  // Preload sounds
  // This is a pain, but touch move events on Chrome Android are blocked from playing audio
  // The touch move event is used for some audio fx such as over-board.mp3. 
  // So instead of playing theaudio inside the webview we send a post message back to here and play the audio here.
  // This is a bit around the house but it works, and we are at least able to use the mp3s from the webview and not have to copy them over
  React.useEffect(() => {
    (async () => {
      const sounds: Record<string, Audio.SoundObject> = {};
      for (const path of paths) {
        sounds[`/audio/${path}.mp3`] = await Audio.Sound.createAsync({
          uri: `${uri}/audio/${path}.mp3`,
        });
      }
      setSounds(sounds);
    })();
  }, []);

  async function playSound({ path }: { path: string; volume: number }) {
    if (sounds) {
      const { sound } = sounds[path];
      await sound.replayAsync();
    }
  }

  // Unload sounds on unmount
  React.useEffect(() => {
    return () => {
      if (!sounds) return;
      Object.values(sounds).forEach(({ sound }) => {
        sound.unloadAsync();
      });
    };
  }, [sounds]);

  return (
    <StyledSafeAreaView style={{ paddingTop: insets.top }}>
      <WebView
        source={{
          uri: `${uri}/`,
        }}
        overScrollMode="never"
        injectedJavaScriptBeforeContentLoaded={
          injectedJavaScriptBeforeContentLoaded
        }
        onMessage={async (event) => {
          const data = JSON.parse(event.nativeEvent.data) as {
            path: string;
            volume: number;
          };
          playSound(data);
        }}
      />
      <StatusBar style="dark" />
    </StyledSafeAreaView>
  );
};
