# react-native-tualo-broadcast-receiver

broadcast receiver for react native

## Installation

```sh
npm install react-native-tualo-broadcast-receiver
```

## Usage

```js
import { register } from 'react-native-tualo-broadcast-receiver';

// ...
if (React.Platform.OS=='android'){
const eventEmitter = new NativeEventEmitter(NativeModules.TualoBroadcastReceiverModule);
    eventListener = eventEmitter.addListener("com.my.fancy.INTENT", (event) => {
    console.log(event) 
});
}
// ...
const result = await register(['com.my.fancy.INTENT']);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
