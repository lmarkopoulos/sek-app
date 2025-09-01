import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'gr.sek.app',
  appName: 'SEK',
  webDir: 'dist',
  bundledWebRuntime: false
  // για live reload στη συσκευή, προσωρινά:
  //,server: { url: 'http://192.168.30.201:5173', cleartext: true }
};

export default config;
