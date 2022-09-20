import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

export default function AnswerButton({ answer, onPress, disable }) {
  return (
    <View style={styles.answerButtonContainer}>
      <TouchableOpacity
        styles={styles.answerButtonContainer}
        onPress={onPress}
        disabled={disable}
      >
        <LinearGradient
          colors={['#8A2387', '#E94057', '#F27121']}
          style={styles.gradient}
        >
          <Text style={styles.answerButtonLabel}>{answer}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  answerButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    width: 400,
    // minWidth: 200,
    // maxWidth: '100%',
    height: 40,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  answerButtonLabel: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#fff',
  },
  gradient: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 400,
    height: 40,
  },
  button: {
    flex: 1,
    width: 400,
    height: 40,
  },
});
