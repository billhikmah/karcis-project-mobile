import React from 'react';
import MainStackNavigator from './src/navigation';
import {Provider as StoreProvider} from 'react-redux';
import stores from './src/store';
const {store, persistor} = stores;
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainStackNavigator />
      </PersistGate>
    </StoreProvider>
  );
}
