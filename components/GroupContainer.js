import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function GroupContainer({ label, id }) {
  return (
    <View style={styles.groupContainer} id={id}>
      <View style={styles.innerContainer}>
        <Text style={styles.textStyle}> {label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  groupContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#f7797d',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#dd3e54',
    width: 145,
    height: 110,
  },

  innerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 108,
  },
  textStyle: {
    color: '#fff',
    fontSize: 20,
  },
  addMarginTop: {
    marginTop: 100,
  },
});
