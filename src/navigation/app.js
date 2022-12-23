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
import Search from '../screens/Search';

import DrawerContent from '../components/DrawerContent';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Header from '../components/Header/default.js';
import HeaderSubScreen from '../components/Header/subscreen.js';

function MenuNavigator() {
  return (
    // DAFTARKAN MENU YANG NANTINYA AKAN MASUK KE DALAM DRAWER DISINI
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          header: props => <Header {...props} />,
          drawerIcon: ({size, color}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          header: props => <HeaderSubScreen {...props} title="Profile" />,
          drawerIcon: ({size, color}) => (
            <Icon name="home" color={color} size={size} />
          ),
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Drawer.Screen
        name="My Booking"
        component={MyBooking}
        options={{
          header: props => <HeaderSubScreen {...props} title="My Booking" />,
          drawerIcon: ({size, color}) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Wishlist"
        component={Wishlist}
        options={{
          header: props => <HeaderSubScreen {...props} title="My Wishlist" />,
          drawerIcon: ({size, color}) => (
            <Icon name="heart" color={color} size={size} />
          ),
          // headerShown: false,
        }}
      />
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
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{
          header: props => <HeaderSubScreen {...props} title="Checkout" />,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          header: props => <HeaderSubScreen {...props} title="Payment" />,
        }}
      />
      <Stack.Screen
        name="Edit"
        component={EditProfile}
        options={{
          header: props => <HeaderSubScreen {...props} title="Edit Profile" />,
        }}
      />
      <Stack.Screen
        name="Change Password"
        component={ChangePassword}
        options={{
          header: props => <HeaderSubScreen {...props} title="Edit Password" />,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          header: props => <HeaderSubScreen {...props} title="Search" />,
        }}
      />
    </Stack.Navigator>
  );
}
