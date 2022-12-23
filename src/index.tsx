import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-tualo-broadcast-receiver' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const TualoBroadcastReceiver = NativeModules.TualoBroadcastReceiver
  ? NativeModules.TualoBroadcastReceiver
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function register(intentFilter: String[]): any {
  console.log(
    'register',
    'index.tsx',
    'intentFilter',
    intentFilter,
    Platform.OS
  );
  if (Platform.OS === 'android')
    return TualoBroadcastReceiver.register(intentFilter);

  console.log('not on android', 'doing nothing');
  return TualoBroadcastReceiver.register();
}

export function unregister(intentFilter: String[]): any {
  console.log(
    'unregister',
    'index.tsx',
    'intentFilter',
    intentFilter,
    Platform.OS
  );
  if (Platform.OS === 'android') return TualoBroadcastReceiver.unregister();
  return null;
}
