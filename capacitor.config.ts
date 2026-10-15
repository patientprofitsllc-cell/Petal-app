import type { CapacitorConfig } from '@capacitor/cli';

// PLACEHOLDER bundle ID. Change `appId` to your real, owned ID before the
// real build (it must match the app record in App Store Connect).
//
// There is deliberately NO `server.url` here: the app must run from the files
// bundled inside the iPhone package, never from a website.
const config: CapacitorConfig = {
  appId: 'com.yourcompany.petal',
  appName: 'Petal',
  webDir: 'dist',
  backgroundColor: '#fffdf9',
  ios: {
    // The web page handles the notch and home bar itself with env(safe-area-*),
    // so the native web view must not add a second inset. ('never' is the
    // default, set here so nobody changes it by accident.)
    contentInset: 'never',
  },
};

export default config;
