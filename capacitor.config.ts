import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ToDoList',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    },
    Camera: {
      permissions: {
        camera: {
          description: "We need your permission to use the camera to update your profile picture."
        },
        photos: {
          description: "We need your permission to access the photo library to update your profile picture."
        }
      }
    }
  },
};

export default config;
