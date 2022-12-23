import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from '../../utilities/axios';

export default function ChangePassword(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState(' ');
  const [isLoading, setIsloading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    props.navigation.replace('MenuNavigator', {screen: 'Profile'});
  };

  const formHandler = (value, name) => {
    setForm({...form, [name]: value});
  };
  const updateHandler = async () => {
    try {
      setErrorMessage(' ');
      setIsloading(true);
      if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
        setIsloading(false);
        return setErrorMessage('Please fill in all required fields.');
      }
      if (form.newPassword !== form.confirmPassword) {
        setIsloading(false);
        return setErrorMessage('Password & Confirm Password do not match');
      }
      await axios.patch('/api/user/update/password', form);
      setIsloading(false);
      showDialog();
    } catch (error) {
      setIsloading(false);
      if (error.response.data.message === 'Enter the correct password') {
        setErrorMessage('Please enter the correct current password');
      }
    }
  };
  return (
    <Provider>
      <View style={styles.body}>
        <View style={styles.block} />
        <ScrollView style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Old Password</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Input Old Password ..."
                placeholderTextColor="#C1C5D0"
                secureTextEntry={showPassword ? false : true}
                onChangeText={text => formHandler(text, 'oldPassword')}
              />
              {showPassword ? (
                <TouchableOpacity
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}>
                  <Icon
                    name="eye"
                    style={styles.icon}
                    size={20}
                    color="#3366FF"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}>
                  <Icon
                    name="eye-slash"
                    style={styles.icon}
                    size={20}
                    color="#3366FF"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Input New Password ..."
                placeholderTextColor="#C1C5D0"
                secureTextEntry={showNewPassword ? false : true}
                onChangeText={text => formHandler(text, 'newPassword')}
              />
              {showNewPassword ? (
                <TouchableOpacity
                  onPress={() => {
                    setShowNewPassword(!showNewPassword);
                  }}>
                  <Icon
                    name="eye"
                    style={styles.icon}
                    size={20}
                    color="#3366FF"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setShowNewPassword(!showNewPassword);
                  }}>
                  <Icon
                    name="eye-slash"
                    style={styles.icon}
                    size={20}
                    color="#3366FF"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Input Confirm Password ..."
                placeholderTextColor="#C1C5D0"
                secureTextEntry={showConfirmPassword ? false : true}
                onChangeText={text => formHandler(text, 'confirmPassword')}
              />
              {showConfirmPassword ? (
                <TouchableOpacity
                  onPress={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}>
                  <Icon
                    name="eye"
                    style={styles.icon}
                    size={20}
                    color="#3366FF"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}>
                  <Icon
                    name="eye-slash"
                    style={styles.icon}
                    size={20}
                    color="#3366FF"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TouchableOpacity style={styles.button} onPress={updateHandler}>
            {isLoading ? (
              <ActivityIndicator
                animating={true}
                color="white"
                size={27.5}
                style={styles.buttonText}
              />
            ) : (
              <Text style={styles.buttonText}>Update</Text>
            )}
          </TouchableOpacity>
        </ScrollView>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Success</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Your password has been changed</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
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
    paddingHorizontal: 30,
  },
  inputContainer: {},
  label: {
    color: '#373A42',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 15,
  },
  inputBox: {
    paddingHorizontal: 20,
    borderColor: '#C1C5D0',
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 35,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: '#373A42',
    flex: 1,
  },
  button: {
    marginTop: 30,
    padding: 15,
    width: '100%',
    backgroundColor: '#3366FF',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'center',
  },
});
