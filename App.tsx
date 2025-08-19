import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ServiceProvider } from './src/providers/ServiceProvider';
import { RootNavigator } from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ServiceProvider>
        <RootNavigator />
      </ServiceProvider>
    </GestureHandlerRootView>
  );
}

export default App;