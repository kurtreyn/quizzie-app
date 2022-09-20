import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-gesture-handler';
import Login from './Login';
import Home from './Home';
import AddQuizGroup from './AddQuizGroup';
import Signup from './Signup';
import Results from './Results';

const screenOptions = {
  headerShown: false,
};
const Tab = createMaterialBottomTabNavigator();

export const SignedInStack = ({ navigation }) => {
  const { current_user } = useSelector((state) => state.Reducer);
  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator
        initialRouteName={current_user ? 'Home' : 'Login'}
        screenOptions={screenOptions}
      >
        <Tab.Screen
          name="Login"
          component={Login}
          labelStyle={{
            color: '#444',
          }}
          options={{
            tabBarLabel: 'Login',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="login" color={color} size={26} />
            ),
          }}
        />
        {!current_user && (
          <Tab.Screen
            name="Signup"
            component={Signup}
            labelStyle={{
              color: '#444',
            }}
            options={{
              tabBarLabel: 'Signup',
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="clipboard-edit-outline"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        )}
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="head-cog-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AddQuizGroup"
          component={AddQuizGroup}
          options={{
            tabBarLabel: 'Create Quiz',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="fountain-pen"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Results"
          component={Results}
          options={{
            tabBarLabel: 'Results',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="equalizer"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export const SignedOutStack = ({ navigation }) => (
  <NavigationContainer>
    <Tab.Navigator initialRouteName="Login" screenOptions={screenOptions}>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Signup" component={Signup} />
    </Tab.Navigator>
  </NavigationContainer>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444',
  },
});
