import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Provider } from 'react-redux';
import Store from './redux/store';
import 'react-native-gesture-handler';
import 'expo-dev-client';
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
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
});
