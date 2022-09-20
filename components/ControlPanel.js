import React from 'react';
import {
  StyleSheet,
  // Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  // TouchableOpacity,
} from 'react-native';
import HorizontalButton from './HorizontalButton';

export default function ControlPanel({
  hasNameOfGroup,
  handleGroupNameStatus,
  handleReset,
  handleAddQandA,
  handleSubmitGroup,
}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.controlPanelContainer}>
          <View>
            {!hasNameOfGroup && (
              <Pressable onPress={handleGroupNameStatus}>
                <HorizontalButton label={'Add Quiz Name'} bgColor={'#FF416C'} />
              </Pressable>
            )}

            {hasNameOfGroup && (
              <Pressable onPress={handleAddQandA}>
                <HorizontalButton
                  label={'Add Question & Answer'}
                  bgColor={'#FF416C'}
                />
              </Pressable>
            )}

            {hasNameOfGroup && (
              <Pressable onPress={handleSubmitGroup}>
                <HorizontalButton label={'Save Quiz'} bgColor={'#2980B9'} />
              </Pressable>
            )}

            {hasNameOfGroup && (
              <Pressable onPress={handleReset}>
                <HorizontalButton label={'Reset'} bgColor={'#d81159'} />
              </Pressable>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  controlPanelContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '50%',
    // borderStyle: 'solid',
    // borderWidth: '2px',
    // borderColor: 'green',
  },
  addTopMargin: {
    marginTop: 100,
  },
});
