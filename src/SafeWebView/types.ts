import * as z from "zod";

// NB Keep in sync with https://github.com/deskpro/deskpro-product/blob/master/packages/horizon-ui/src/common/reactNativeWebview/types.ts
export const nativeEventMessagesSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("webviewLoaded") }),
  z.object({
    type: z.literal("setLoginToken"),
    domain: z.string(),
    token: z.string().optional(),
  }),
  z.object({
    type: z.literal("deleteLoginToken"),
    domain: z.string(),
    cause: z.string().optional(), // TODO remove optional once dp-product changes released
    caller: z.string().optional(),
  }),
  z.object({ type: z.literal("navigate"), screen: z.string() }),
  z.object({
    type: z.literal("download"),
    url: z.string(),
    filename: z.string(),
  }),
  z.object({ type: z.literal("log"), value: z.any() }),
]);

export type NativeEventMessage = z.infer<typeof nativeEventMessagesSchema>;
