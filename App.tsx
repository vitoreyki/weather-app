import React from 'react';
import {Weather} from './src/lib/weather/screens/weather';
import {StatusBar} from 'react-native';

function App(): React.JSX.Element {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <>
      <StatusBar backgroundColor="#2a8ee1" />
      <Weather />
    </>
  );
}

export default App;
