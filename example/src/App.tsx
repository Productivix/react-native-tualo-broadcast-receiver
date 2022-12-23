import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  EmitterSubscription,
} from 'react-native';
import { register } from 'react-native-tualo-broadcast-receiver';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { useRef } from 'react';
export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  const useEvent = (event: any) => {
    setResult(event.data);
  };
  const cbRef = useRef(useEvent);

  React.useEffect(() => {
    let subscription: EmitterSubscription;
    const eventEmitter = new NativeEventEmitter(
      NativeModules.TualoBroadcastReceiverModule
    );
    if (Platform.OS === 'android') {
      cbRef.current = useEvent;
      const cb = (e: any) => cbRef.current(e);

      subscription = eventEmitter.addListener(
        'com.sunmi.scanner.ACTION_DATA_CODE_RECEIVED',
        cb
      );
    }
    return () => {
      if (subscription && eventEmitter && eventEmitter.removeSubscription)
        eventEmitter.removeSubscription(subscription);
    };
  }, []);
  register(['com.sunmi.scanner.ACTION_DATA_CODE_RECEIVED']);
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
