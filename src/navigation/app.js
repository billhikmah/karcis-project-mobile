import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Profile from '../screens/Profile';
import ChangePassword from '../screens/ChangePassword';
import EditProfile from '../screens/EditProfile';
import MyBooking from '../screens/MyBooking';
import Order from '../screens/Order';
import Payment from '../screens/Payment';
import Wishlist from '../screens/Wishlist';

function MenuNavigator() {
  return (
    // DAFTARKAN MENU YANG NANTINYA AKAN MASUK KE DALAM DRAWER DISINI
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="My Booking" component={MyBooking} />
      <Drawer.Screen name="My Wishlist" component={Wishlist} />
    </Drawer.Navigator>
  );
}

export default function AppStackNavigator() {
  return (
    // DAFTARKAN MENU YANG NANTINYA DAPAT DI AKSES DILUAR DRAWER DISINI
    <Stack.Navigator initialRouteName="MenuNavigator">
      <Stack.Screen
        name="MenuNavigator"
        component={MenuNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Edit" component={EditProfile} />
      <Stack.Screen name="Change Password" component={ChangePassword} />
    </Stack.Navigator>
  );
}
