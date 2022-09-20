import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { setPosts } from '../redux/actions';

export default function InputContainer({
  hasNameOfGroup,
  question,
  setQuestion,
  answer,
  setAnswer,
  nameOfGroup,
  setNameOfGroup,
}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.inputContainer}>
          {!hasNameOfGroup && (
            <View style={styles.instructionsWrapper}>
              <Text style={styles.labelStyle}>Enter a Name for your Quiz</Text>
            </View>
          )}

          {hasNameOfGroup && (
            <View style={styles.instructionsWrapper}>
              <Text style={styles.labelStyle}>Add Questions & Answers</Text>
            </View>
          )}

          <View style={styles.innerInputContainer}>
            {!hasNameOfGroup && (
              <View style={styles.formWrapper}>
                <Text style={styles.labelStyle}>Quiz Name</Text>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="enter quiz name"
                  placeholderTextColor="#444"
                  autoCapitalize="none"
                  keyboardType="text"
                  autoFocus={true}
                  onChangeText={setNameOfGroup}
                  value={nameOfGroup}
                />
              </View>
            )}

            {hasNameOfGroup && (
              <View style={styles.formWrapper}>
                <Text style={styles.labelStyle}>Question</Text>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="enter question"
                  placeholderTextColor="#444"
                  autoCapitalize="none"
                  keyboardType="text"
                  autoFocus={true}
                  onChangeText={setQuestion}
                  value={question}
                />
              </View>
            )}
            {hasNameOfGroup && (
              <View style={styles.formWrapper}>
                <Text style={styles.labelStyle}>Answer</Text>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="enter answer"
                  placeholderTextColor="#444"
                  autoCapitalize="none"
                  keyboardType="text"
                  autoFocus={true}
                  onChangeText={setAnswer}
                  value={answer}
                />
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'column',
    height: '50%',
    minHeight: '50%',
    // borderStyle: 'solid',
    // borderWidth: '2px',
    // borderColor: 'yellow',
  },
  innerInputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // borderStyle: 'solid',
    // borderWidth: '2px',
    // borderColor: 'red',
  },
  formWrapper: {
    display: 'flex',
    marginTop: 50,
    // marginBottom: 15,
  },
  textInputStyle: {
    width: 390,
    height: 50,
    backgroundColor: '#fff',
    // marginTop: 5,
    // marginBottom: 5,
    padding: 4,
  },
  labelStyle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '400',
  },
  instructionsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // borderStyle: 'solid',
    // borderWidth: '2px',
    // borderColor: 'red',
  },
});
