import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Landing from '../screens/Landing';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import Forgot from '../screens/Forgot';

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
