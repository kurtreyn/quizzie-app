import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function HorizontalButton({ label, bgColor }) {
  return (
    <View
      style={[styles.horizontalButtonContainer, { backgroundColor: bgColor }]}
    >
      <Text style={styles.horizontalButtonLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    width: 400,
    height: 40,
    marginBottom: 10,
  },

  horizontalButtonLabel: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#fff',
  },
});
