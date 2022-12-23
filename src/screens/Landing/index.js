import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default function SplashScreen(props) {
  const navigationHandler = path => {
    props.navigation.navigate(path);
  };
  return (
    <View style={styles.main}>
      <Text style={styles.text}>
        Welcome to{' '}
        <Text style={styles.title}>
          {' '}
          Kar
          <Text style={styles.subtitle}>cis </Text>
        </Text>
      </Text>
      <Image source={require('../../assets/Images/Image-1.png')} alt="banner" />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={() => {
          navigationHandler('Signin');
        }}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={() => {
          navigationHandler('Signup');
        }}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#3366FF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 28,
    letterSpacing: 2,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  title: {
    backgroundColor: '#ffffff',
    color: '#3366FF',
  },
  subtitle: {color: 'deeppink'},
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    width: '80%',
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#3366FF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 25,
    letterSpacing: 3,
  },
});
