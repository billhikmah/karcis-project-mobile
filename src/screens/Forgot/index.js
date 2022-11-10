import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default function Signup(props) {
  //   const handleLogin = () => {
  //     props.navigation.replace('AppScreen', {screen: 'MenuNavigator'});
  //   };
  const navigationHandler = path => {
    props.navigation.navigate(path);
  };
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.backContainer}>
        <Text
          style={styles.backButton}
          onPress={() => {
            navigationHandler('Signin');
          }}>
          back
        </Text>
      </TouchableOpacity>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.text}>You’ll get mail soon on your email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#C1C5D0"
          style={styles.input}
        />
      </View>
      <TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Text style={styles.button}>Send</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {backgroundColor: '#ffffff', flex: 1},
  backContainer: {
    alignSelf: 'flex-start',
  },
  backButton: {
    color: '#000000',
    margin: '5%',
    fontSize: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '900',
    fontSize: 26,
    color: '#373A42',
    marginHorizontal: '5%',
    marginTop: '10%',
    letterSpacing: 2,
  },
  text: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.5,
    marginHorizontal: '5%',
    marginTop: '5%',
    marginBottom: '10%',
    color: '#373A42',
  },
  inputContainer: {
    marginHorizontal: '5%',
    marginTop: '5%',
    borderWidth: 1,
    borderColor: '#C1C5D0',
    borderRadius: 15,
  },
  input: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: 'black',
    paddingHorizontal: '5%',
  },
  buttonContainer: {
    marginHorizontal: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    alignItems: 'center',
    backgroundColor: '#3366FF',
    borderRadius: 15,
    shadowRadius: 2,
  },
  button: {
    fontFamily: 'Poppins',
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 0.5,
    color: '#FFFFFF',
    padding: '5%',
  },
});
