// NB: Keep in sync with app.config
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_VARIANT: "development" | "preview" | "production";
      WEBVIEW_URI?: string;
    }
  }
}

export {};
