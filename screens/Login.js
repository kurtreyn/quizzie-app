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
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/actions';
import { LinearGradient } from 'expo-linear-gradient';
import { firebase } from '../firebase';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Validator from 'email-validator';

import appLogo from '../assets/quizzie-logo.png';
import { ScrollView } from 'react-native-gesture-handler';
const screenWidth = Dimensions.get('window').width;
const quizzieLogo = Image.resolveAssetSource(appLogo).uri;

export default function Login({ navigation }) {
  const { current_user } = useSelector((state) => state.Reducer);
  const dispatch = useDispatch();
  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password: Yup.string()
      .required()
      .min(6, 'Your password has to have at least 8 characters'),
  });

  const onLogin = async (email, password) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          console.log('Firebase Login Successful', email, password);
          // if (response) {
          //   navigation.navigate({ name: 'Home' });
          // }
        });
    } catch (error) {
      Alert.alert(
        'Uh oh!',
        error.message + '\n\n ... What would you like to do next?',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK'),
            style: 'cancel',
          },
          {
            text: 'Sign Up',
            onPress: () => navigation.navigate({ name: 'Signup' }),
          },
        ]
      );
    }
  };

  const onSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Sign-out successful.');
        dispatch(setCurrentUser(null));
      })
      .catch((error) => {
        console.log(error);
      });
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
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                  onLogin(values.email, values.password);
                }}
                validationSchema={loginFormSchema}
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
                    {!current_user && (
                      <View
                        style={[
                          styles.inputField,
                          {
                            borderColor:
                              values.email.length < 1 ||
                              Validator.validate(values.email)
                                ? '#fff'
                                : 'red',
                          },
                        ]}
                      >
                        <TextInput
                          placeholder="username or email"
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
                    )}
                    {!current_user && (
                      <View
                        style={[
                          styles.inputField,
                          {
                            borderColor:
                              1 > values.password.length ||
                              values.password.length > 6
                                ? '#fff'
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
                    )}

                    {!current_user && (
                      <View
                        style={{ alignItems: 'flex-end', marginBottom: 30 }}
                      >
                        <Text style={{ color: '#3c1053' }}>
                          Forgot password?
                        </Text>
                      </View>
                    )}
                    {!current_user && (
                      <Pressable
                        titleSize={20}
                        style={styles.button(isValid)}
                        onPress={handleSubmit}
                      >
                        <Text style={styles.buttonText}>Log In</Text>
                      </Pressable>
                    )}
                    {current_user && (
                      <Pressable
                        titleSize={20}
                        style={styles.button(isValid)}
                        onPress={onSignout}
                      >
                        <Text style={styles.buttonText}>Sign Out</Text>
                      </Pressable>
                    )}
                    <View style={styles.signupContainer}>
                      <Text>Don't have an account?</Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate({ name: 'Signup' })}
                      >
                        <Text style={{ color: '#3c1053' }}> Sign Up</Text>
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
