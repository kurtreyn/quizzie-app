import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  Pressable,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { firebase, db } from '../firebase';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';

import appLogo from '../assets/quizzie-logo.png';
import BLANK_PROFILE_PIC from '../assets/profile-avatar.png';
const screenWidth = Dimensions.get('window').width;
const quizzieLogo = Image.resolveAssetSource(appLogo).uri;
const profileAvatar = Image.resolveAssetSource(BLANK_PROFILE_PIC).uri;

export default function Signup({ navigation }) {
  const signupFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    username: Yup.string().required().min(2, 'A username is required'),
    password: Yup.string()
      .required()
      .min(6, 'Your password has to have at least 8 characters'),
  });

  const onSignup = async (email, username, password) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log('Firebas user created successfully');
      db.collection('users')
        .doc(authUser.user.email)
        .set({
          owner_uid: authUser.user.uid,
          username: username,
          email: authUser.user.email,
          profile_picture: profileAvatar,
          photoURL: profileAvatar,
        })
        .then(() => navigation.navigate({ name: 'Login' }));
    } catch (error) {
      Alert.alert('Uh oh...', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.loginContainer}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <LinearGradient
            colors={['#2980B9', '#6DD5FA', '#FFFFFF']}
            style={styles.background}
          >
            <View style={styles.logoContainer}>
              <Image source={{ uri: quizzieLogo, height: 150, width: 200 }} />
            </View>
            <View style={styles.wrapper}>
              <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={(values) => {
                  onSignup(values.email, values.username, values.password);
                }}
                validationSchema={signupFormSchema}
                validateOnMount={true}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  isValid,
                }) => (
                  <>
                    <View
                      style={[
                        styles.inputField,
                        {
                          borderColor:
                            values.email.length < 1 ||
                            Validator.validate(values.email)
                              ? '#ccc'
                              : 'red',
                        },
                      ]}
                    >
                      <TextInput
                        placeholder="Email"
                        placeholderTextColor="#444"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoFocus={true}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />
                    </View>
                    <View
                      style={[
                        styles.inputField,
                        {
                          borderColor:
                            values.email.length < 1 ||
                            Validator.validate(values.email)
                              ? '#ccc'
                              : 'red',
                        },
                      ]}
                    >
                      <TextInput
                        placeholder="Username"
                        placeholderTextColor="#444"
                        autoCapitalize="none"
                        textContentType="username"
                        autoFocus={true}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                      />
                    </View>
                    <View
                      style={[
                        styles.inputField,
                        {
                          borderColor:
                            1 > values.password.length ||
                            values.password.length > 6
                              ? '#CCC'
                              : 'red',
                        },
                      ]}
                    >
                      <TextInput
                        placeholder="Password"
                        placeholderTextColor="#444"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType="password"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                      />
                    </View>
                    <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
                      <Text style={{ color: '#3c1053' }}>Forgot password?</Text>
                    </View>
                    <Pressable
                      titleSize={20}
                      style={styles.button(isValid)}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.buttonText}>Sign Up</Text>
                    </Pressable>
                    <View style={styles.signupContainer}>
                      <Text>Already have an account?</Text>
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ color: '#3c1053' }}> Log In</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </LinearGradient>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: screenWidth,
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  loginHeader: {
    alignItems: 'center',
  },
  loginHeaderText: {
    fontSize: '25px',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 600,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  wrapper: {
    marginTop: 100,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? '#5D26C1' : '#FF0080',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    fontWeight: '600',
    color: '#FFF',
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
});
