import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function SplashScreen(props) {
  const token = false;

  useEffect(() => {
    checkToken();
  });

  const checkToken = () => {
    setTimeout(() => {
      if (token) {
        props.navigation.replace('AppScreen');
      } else {
        props.navigation.replace('AuthScreen');
      }
    }, 1500);
  };

  return (
    <View style={styles.main}>
      <Text style={styles.text}>Find Events</Text>
      <Text style={styles.text}>You Love</Text>
      <Image source={require('../../assets/Images/Image-1.png')} alt="banner" />
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
    fontSize: 48,
    lineHeight: 72,
    letterSpacing: 2,
    color: '#FFFFFF',
  },
});
