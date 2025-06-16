import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.preplens.app',
  appName: 'PrepLens',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      keystorePath: 'preplens.keystore',
      keystorePassword: 'your-keystore-password',
      keystoreAlias: 'preplens',
      keystoreAliasPassword: 'your-alias-password'
    }
  }
};

export default config;
