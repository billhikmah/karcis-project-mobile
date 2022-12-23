import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {signinAction} from '../../store/action/user.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import {getUserAction} from '../../store/action/user';

export default function Signin(props) {
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeForm = (value, name) => {
    setForm({...form, [name]: value});
  };

  const loginHandler = async () => {
    try {
      setErrorMessage(' ');
      setIsLoading(true);
      if (!form.email || !form.password) {
        setIsLoading(false);
        return setErrorMessage('Please fill in all required fields.');
      }
      const result = await dispatch(signinAction(form));
      await AsyncStorage.setItem(
        'token',
        result.action.payload.data.data.token,
      );
      await AsyncStorage.setItem(
        'refreshToken',
        result.action.payload.data.data.refreshToken,
      );
      await AsyncStorage.setItem('id', result.action.payload.data.data.user_id);
      setIsLoading(false);

      dispatch(getUserAction());
      props.navigation.replace('AppScreen', {screen: 'MenuNavigator'});
      return;
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(userData.errorMessage);
    }
  };

  const navigationHandler = path => {
    if (path === 'back') {
      return props.navigation.goBack();
    }
    props.navigation.navigate(path);
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView style={styles.main}>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => {
          navigationHandler('back');
        }}>
        <Icon name="arrow-left" style={styles.backButton} />
      </TouchableOpacity>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.text}>Hi, Welcome back to Karcis!</Text>
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
          secureTextEntry={!showPassword ? true : false}
          onChangeText={text => handleChangeForm(text, 'password')}
        />
        {showPassword ? (
          <Icon
            name="eye"
            onPress={showPasswordHandler}
            style={styles.eye}
            size={20}
          />
        ) : (
          <Icon
            name="eye-slash"
            onPress={showPasswordHandler}
            style={styles.eye}
            size={20}
          />
        )}
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
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        <Text>&nbsp;</Text>
      )}
      <TouchableOpacity
        onPress={() => {
          loginHandler();
        }}>
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator
              animating={isLoading}
              color="white"
              size={20}
              style={styles.button}
            />
          ) : (
            <Text style={styles.button}>Log In</Text>
          )}
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
    </ScrollView>
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
  eye: {
    color: '#3366FF',
    justifyContent: 'center',
    alignItems: 'center',
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
  errorMessage: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
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
