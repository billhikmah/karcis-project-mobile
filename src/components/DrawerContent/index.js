import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import axiosApiIntances from '../../utilities/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

function DrawerContent(props) {
  const user = useSelector(state => state.user.userInfo[0]);

  const handleLogout = async () => {
    try {
      await axiosApiIntances.delete('/api/auth');
      await AsyncStorage.clear();
      props.navigation.replace('AuthScreen');
    } catch (error) {
      await AsyncStorage.clear();
    }
  };
  return (
    <>
      <View style={styles.container}>
        <DrawerContentScrollView {...props}>
          <TouchableOpacity
            style={styles.containerProfile}
            onPress={() => {
              props.navigation.navigate('Profile');
            }}>
            {user.image ? (
              <Image
                source={{
                  uri: `https://res.cloudinary.com/starbillscloud/image/upload/v1663094115/${user.image} `,
                }}
                alt="profile"
                style={styles.image}
              />
            ) : (
              <View style={styles.avatar} />
            )}

            <View style={styles.biodata}>
              <Text style={styles.title}>{user.name}</Text>
              <Text style={styles.caption}>@{user.username}</Text>
            </View>
          </TouchableOpacity>
          <DrawerItemList {...props} />
          <View style={styles.containerSection}>
            <DrawerItem
              label="Logout"
              inactiveTintColor="red"
              icon={({color, size}) => (
                <Icon color="red" size={size} name="log-out" />
              )}
              onPress={handleLogout}
            />
          </View>
        </DrawerContentScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerProfile: {
    margin: 10,
    marginVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: 'gray',
  },
  biodata: {
    marginLeft: 15,
  },
  title: {
    fontSize: 20,
    marginBottom: 3,
    fontWeight: 'bold',
    color: 'black',
  },
  caption: {
    fontSize: 16,
    lineHeight: 14,
    color: 'black',
  },
  containerSection: {
    marginBottom: 5,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: 'gray',
  },
});

export default DrawerContent;
