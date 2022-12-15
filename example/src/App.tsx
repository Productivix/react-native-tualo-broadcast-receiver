import * as React from 'react';

import { StyleSheet, View, Text , DeviceEventEmitter } from 'react-native';
import { register } from 'react-native-tualo-broadcast-receiver';
import { NativeEventEmitter, NativeModules } from 'react-native';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();
  let eventListener;

  React.useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.TualoBroadcastReceiverModule);
    eventListener = eventEmitter.addListener("com.sunmi.scanner.ACTION_DATA_CODE_RECEIVED", (event) => {
      console.log(event) // "someValue"
   });

    

    setTimeout( ()=>{
      console.log('ook 1')
      register(["com.sunmi.scanner.ACTION_DATA_CODE_RECEIVED"]);
    }, 1000);

    console.log('ook')
    
  }, []);

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
