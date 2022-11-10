import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

export default function Signin(props) {
  const loginHandler = () => {
    props.navigation.replace('AppScreen', {screen: 'MenuNavigator'});
  };
  const navigationHandler = path => {
    props.navigation.navigate(path);
  };
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.backContainer}>
        <Text
          style={styles.backButton}
          onPress={() => {
            navigationHandler('Landing');
          }}>
          back
        </Text>
      </TouchableOpacity>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.text}>Hi, Welcome back to Karcis!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#C1C5D0"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#C1C5D0"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#C1C5D0"
          style={styles.input}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.forgotContainer}>
        <TouchableOpacity>
          <Text
            style={styles.forgot}
            onPress={() => {
              navigationHandler('Forgot');
            }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Text style={styles.button} onPress={loginHandler}>
            Log In
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.optionText}>or sign in with</Text>
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.option}>
          <Image
            source={require('../../assets/Vectors/Logo-1.png')}
            alt="Logo"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Image
            source={require('../../assets/Vectors/Logo-2.png')}
            alt="Logo"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Image
            source={require('../../assets/Vectors/Logo-3.png')}
            alt="Logo"
          />
        </TouchableOpacity>
      </View>
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
  forgotContainer: {
    marginHorizontal: '5%',
    marginTop: '5%',
    marginBottom: '10%',
    alignItems: 'flex-end',
  },
  forgot: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 0.5,
    color: '#3366FF',
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
  optionText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.5,
    marginHorizontal: '5%',
    marginTop: '5%',
    marginBottom: '10%',
    color: '#373A42',
    textAlign: 'center',
  },
  optionContainer: {
    marginHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  option: {
    borderWidth: 1,
    borderColor: '#3366FF',
    borderRadius: 15,
    width: 110,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
