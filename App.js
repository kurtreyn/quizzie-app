import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Store from './redux/store';
import 'react-native-gesture-handler';

import AuthNavigation from './AuthNavigation';

export default function App() {
  return (
    <Provider store={Store}>
      <View style={styles.container}>
        <AuthNavigation />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
