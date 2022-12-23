import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from '../../utilities/axios';
import {Checkbox} from 'react-native-paper';
import {ActivityIndicator} from 'react-native-paper';

export default function Signup(props) {
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigationHandler = () => {
    props.navigation.goBack();
  };
  const confirmPasswordHandler = text => {
    setConfirmPassword(text);
  };
  const handleChangeForm = (value, name) => {
    setForm({...form, [name]: value});
  };
  const signUpHandler = async () => {
    try {
      setErrorMessage(' ');
      setIsLoading(true);
      if (!form.name || !form.email || !form.password || !confirmPassword) {
        setIsLoading(false);
        return setErrorMessage('Please fill in all required fields.');
      }
      if (confirmPassword !== form.password) {
        setIsLoading(false);
        return setErrorMessage('Password & Confirm Password do not match');
      }
      if (!checked) {
        setIsLoading(false);
        return setErrorMessage(
          'Please check the terms and conditions to continue',
        );
      }
      await axios.post('/api/auth/register', form);
      Alert.alert('Success', 'Check your email to activate your account', [
        {text: 'OK', onPress: () => props.navigation.replace('AuthScreen')},
      ]);
      setIsLoading(false);
      setErrorMessage(null);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.response.data.message);
    }
  };
  const showPasswordHandler = show => {
    if (show === 'confirm') {
      return setShowConfirmPassword(!showConfirmPassword);
    }
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView style={styles.main}>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => {
          navigationHandler();
        }}>
        <Icon name="arrow-left" style={styles.backButton} />
      </TouchableOpacity>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.text}>
        Already have an account?
        <Text
          style={styles.subtext}
          onPress={() => {
            navigationHandler('Signin');
          }}>
          {' '}
          Log In
        </Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#C1C5D0"
          style={styles.input}
          onChangeText={text => handleChangeForm(text, 'name')}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#C1C5D0"
          style={styles.input}
          onChangeText={text => handleChangeForm(text, 'email')}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#C1C5D0"
          style={styles.input}
          secureTextEntry={showPassword ? false : true}
          onChangeText={text => handleChangeForm(text, 'password')}
        />
        {showPassword ? (
          <Icon
            name="eye"
            onPress={() => {
              showPasswordHandler('password');
            }}
            style={styles.eye}
            size={20}
          />
        ) : (
          <Icon
            name="eye-slash"
            onPress={() => {
              showPasswordHandler('password');
            }}
            style={styles.eye}
            size={20}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#C1C5D0"
          style={styles.input}
          secureTextEntry={showConfirmPassword ? false : true}
          onChangeText={text => confirmPasswordHandler(text)}
        />
        {showConfirmPassword ? (
          <Icon
            name="eye"
            onPress={() => {
              showPasswordHandler('confirm');
            }}
            style={styles.eye}
            size={20}
          />
        ) : (
          <Icon
            name="eye-slash"
            onPress={() => {
              showPasswordHandler('confirm');
            }}
            style={styles.eye}
            size={20}
          />
        )}
      </View>
      <View style={styles.termsContainer}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
          color="#3366FF"
        />
        <Text style={styles.terms}>Accept terms and condition</Text>
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        <Text> </Text>
      )}
      <TouchableOpacity onPress={signUpHandler}>
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator
              animating={isLoading}
              color="white"
              size={20}
              style={styles.button}
            />
          ) : (
            <Text style={styles.button}>Sign Up</Text>
          )}
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonSignup: {
    padding: 10,
    backgroundColor: 'blue',
  },
  main: {backgroundColor: '#ffffff', flex: 1},
  backContainer: {
    alignSelf: 'flex-start',
  },
  backButton: {
    color: '#000000',
    margin: '5%',
    fontSize: 25,
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
  subtext: {
    color: '#3366FF',
    fontWeight: '700',
  },
  inputContainer: {
    marginHorizontal: '5%',
    marginTop: '5%',
    borderWidth: 1,
    borderColor: '#C1C5D0',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  input: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: 'black',
    width: '90%',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '5%',
  },
  terms: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    letterSpacing: 0.5,
    color: '#373A42',
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
  eye: {
    color: '#3366FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});
