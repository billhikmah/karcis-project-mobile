/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';

export default function Profile(props) {
  const user = useSelector(state => state.user.userInfo[0]);
  return (
    <View style={styles.body}>
      <View style={styles.block} />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
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
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.profession}>
          {user.profession.name}, {user.nationality.name}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Edit');
          }}>
          <Icon name="edit" style={styles.icon} size={20} color="#373A42" />
          <Text style={styles.buttonText}>Edit Profile</Text>
          <Icon
            name="arrowright"
            style={styles.icon}
            size={20}
            color="#373A42"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('Change Password');
          }}>
          <Icon name="unlock" style={styles.icon} size={20} color="#373A42" />
          <Text style={styles.buttonText}>Change Password</Text>
          <Icon
            name="arrowright"
            style={styles.icon}
            size={20}
            color="#373A42"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#3366FF',
    height: '100%',
  },
  block: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: 'white',
    paddingHorizontal: 50,
    paddingVertical: 20,
    marginTop: 50,
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: 'gray',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: 'gray',
  },
  imageContainer: {
    borderWidth: 4,
    borderColor: '#2395FF',
    borderRadius: 150,
    padding: 9,
  },
  name: {
    fontFamily: 'Poppins',
    fontSize: 25,
    color: '#373A42',
    marginTop: 20,
    marginBottom: 10,
  },
  profession: {
    fontFamily: 'Poppins',
    fontSize: 15,
    color: '#696969',
    marginBottom: 150,
  },
  button: {
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: 20,
    color: '#373A42',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingHorizontal: 20,
    width: '80%',
  },
});
