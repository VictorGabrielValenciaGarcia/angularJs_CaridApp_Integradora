import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sensiTics.caridApp',
  appName: 'CaridApp',
  webDir: 'www',
  bundledWebRuntime: false,
   plugins: {
    SplashScreen: {
      launchShowDuration: 6000,
      launchAutoHide: true,
      launchFadeOutDuration: 3000,
      backgroundColor: "#f8cbad",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      // androidSpinnerStyle: "large",
      // iosSpinnerStyle: "small",
      // spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  },
};

export default config;
