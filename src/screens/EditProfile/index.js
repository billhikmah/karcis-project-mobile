import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {ActivityIndicator, Button, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Fontisto';
import {useDispatch, useSelector} from 'react-redux';
import axios from '../../utilities/axios';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {getUserAction} from '../../store/action/user';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Edit(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo[0]);
  const [form, setForm] = useState({});
  const [errorMessage, setErrorMessage] = useState(' ');
  const [isLoading, setIsloading] = useState(false);
  const [gender, setGender] = useState(user.gender.id);
  const [selectedProfession, setSelectedProfession] = useState(
    user.profession.id,
  );
  const [selectedNationality, setSelectedNationality] = useState(
    user.nationality.id,
  );
  const [date, setDate] = useState(new Date(user.date_of_birth));
  const [open, setOpen] = useState(false);
  const [formImage, setFormImage] = useState({});
  const [preview, setPreview] = useState('');
  const [upload, setUpload] = useState(false);
  const [focus, setFocus] = useState(false);

  const formHandler = (value, name) => {
    setForm({...form, [name]: value});
  };
  const updateHandler = async () => {
    try {
      setErrorMessage(' ');
      setIsloading(true);
      await axios.patch('/api/user', form);
      dispatch(getUserAction());
      setIsloading(false);
      ToastAndroid.show(
        'Your profile has been updated',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } catch (error) {
      setIsloading(false);
      if (
        error.response.data.message ===
        'invalid input syntax for type bigint: "89508598100d"'
      ) {
        setErrorMessage('Invalid phone number input');
      }
    }
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Karcis Camera Permission',
          message: 'Karcis needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
          },
          response => {
            if (response.didCancel) {
              console.log('Cancelled');
            }
            if (response.errorCode) {
              console.log('Error: ', response.errorMessage);
            }
            if (response.assets) {
              const source = {
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                name: response.assets[0].fileName,
              };
              setFormImage({...formImage, image: source});
              setPreview(response.assets[0].uri);
            }
          },
        );
      } else {
        console.log('Camera Permission Denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Karcis Camera Permission',
          message: 'Karcis needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchImageLibrary(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
          },
          response => {
            if (response.didCancel) {
              console.log('Cancelled');
            }
            if (response.errorCode) {
              console.log('Error: ', response.errorMessage);
            }
            if (response.assets) {
              const source = {
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                name: response.assets[0].fileName,
              };
              setFormImage({...formImage, image: source});
              setPreview(response.assets[0].uri);
            }
          },
        );
      } else {
        console.log('Gallery Permission Denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const updateImageHandler = async () => {
    try {
      setUpload(true);
      const formData = new FormData();
      for (const data in formImage) {
        formData.append(data, formImage[data]);
      }
      await axios.patch('/api/user', formData);
      dispatch(getUserAction());
      setUpload(false);
      setFormImage({});
      setPreview('');
      ToastAndroid.show(
        'Your profile picture has been updated',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } catch (error) {
      setUpload(false);
    }
  };
  const cancelImageHandler = () => {
    setFormImage({});
    setPreview('');
  };
  return (
    <Provider>
      <View style={styles.body}>
        <View style={styles.block} />
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            {preview ? (
              <Image
                source={{uri: preview}}
                alt="profile"
                style={styles.image}
              />
            ) : user.image ? (
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
          {!preview ? (
            <View style={styles.updateImageContainer}>
              <TouchableOpacity
                style={styles.cameraContainer}
                onPress={requestCameraPermission}>
                <Icon name="camera" size={15} color="#3366FF" />
                <Text style={styles.camera}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.galleryContainer}
                onPress={requestGalleryPermission}>
                <Icon name="picture" size={15} color="#3366FF" />
                <Text style={styles.gallery}>Gallery</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.updateImageContainer}>
              <TouchableOpacity
                style={styles.cameraContainer}
                onPress={updateImageHandler}>
                <Icon name="save" size={15} color="#3366FF" />
                {!upload ? (
                  <Text style={styles.camera}>Save</Text>
                ) : (
                  <ActivityIndicator
                    animating={true}
                    color="#3366FF"
                    size={15}
                    style={styles.camera}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.galleryContainer}
                onPress={cancelImageHandler}>
                <Icon name="trash" size={15} color="#3366FF" />
                <Text style={styles.gallery}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Input Your Name ..."
                placeholderTextColor="#C1C5D0"
                defaultValue={user.name}
                onChangeText={text => formHandler(text, 'name')}
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={() => {
                  setFocus(false);
                }}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputBox}>
              <Text style={styles.tag}>@ </Text>
              <TextInput
                style={styles.input}
                placeholder="Input Username ..."
                defaultValue={user.username}
                onChangeText={text => formHandler(text, 'username')}
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={() => {
                  setFocus(false);
                }}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Input Your Email ..."
                placeholderTextColor="#C1C5D0"
                defaultValue={user.email}
                onChangeText={text => formHandler(text, 'email')}
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={() => {
                  setFocus(false);
                }}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <View style={styles.inputBox}>
              <Text style={styles.tag}>+62 </Text>
              <TextInput
                style={styles.input}
                placeholder="Input Your Phone Number ..."
                placeholderTextColor="#C1C5D0"
                defaultValue={user.phone.toString()}
                onChangeText={text => formHandler(text, 'phone')}
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={() => {
                  setFocus(false);
                }}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={styles.radio}
                onPress={() => {
                  setGender('75f7e98d-c7f1-4877-9902-f3b155f4e389');
                  formHandler('75f7e98d-c7f1-4877-9902-f3b155f4e389', 'gender');
                }}>
                <Icon
                  name={
                    gender === '75f7e98d-c7f1-4877-9902-f3b155f4e389'
                      ? 'radio-btn-active'
                      : 'radio-btn-passive'
                  }
                  size={20}
                  color="#3366FF"
                />
                <Text style={styles.radioText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radio}
                onPress={() => {
                  setGender('c2ecc310-d009-4ea8-93f8-f903daf4bee7');
                  formHandler('c2ecc310-d009-4ea8-93f8-f903daf4bee7', 'gender');
                }}>
                <Icon
                  name={
                    gender === 'c2ecc310-d009-4ea8-93f8-f903daf4bee7'
                      ? 'radio-btn-active'
                      : 'radio-btn-passive'
                  }
                  size={20}
                  color="#3366FF"
                />
                <Text style={styles.radioText}>Female</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Profession</Text>
            <View style={styles.inputBox}>
              <Picker
                selectedValue={selectedProfession}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedProfession(itemValue);
                  formHandler(itemValue, 'profession');
                }}
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={() => {
                  setFocus(false);
                }}>
                <Picker.Item
                  label="Entrepreneur"
                  value="acc88543-f776-410b-8533-186ae57a0f93"
                />
                <Picker.Item
                  label="Doctor"
                  value="ff20d4f9-c2df-4e40-88e6-9fdaeffaec56"
                />
                <Picker.Item
                  label="Programmer"
                  value="fdb12b9f-bcf4-4904-a571-9f3aaaf6f03e"
                />
                <Picker.Item
                  label="etc."
                  value="de2ef15a-625d-43a6-be09-128c4528a303"
                />
              </Picker>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nationality</Text>
            <View style={styles.inputBox}>
              <Picker
                selectedValue={selectedNationality}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedNationality(itemValue);
                  formHandler(itemValue, 'nationality');
                }}
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={() => {
                  setFocus(false);
                }}>
                <Picker.Item
                  label="Indonesian"
                  value="e02aebda-6a9a-4af6-bcb7-2633a8ef99ea"
                />
                <Picker.Item
                  label="Foreigner"
                  value="254fbbcd-1c7d-4303-bc20-a33c6608f405"
                />
              </Picker>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Birthday Date</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>
                {moment(date).format('D / MM / YYYY')}
              </Text>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text style={styles.datePick}>Edit</Text>
                <Button title="Open" onPress={() => setOpen(true)} />
                <DatePicker
                  modal
                  open={open}
                  date={date}
                  mode="date"
                  onConfirm={value => {
                    setOpen(false);
                    setDate(value);
                    formHandler(
                      moment(value).format('YYYY-MM-DD'),
                      'date_of_birth',
                    );
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </ScrollView>
        {focus ? (
          <></>
        ) : (
          <TouchableOpacity style={styles.button} onPress={updateHandler}>
            {isLoading ? (
              <ActivityIndicator
                animating={true}
                color="white"
                size={27.5}
                style={styles.buttonText}
              />
            ) : (
              <Text style={styles.buttonText}>Save</Text>
            )}
          </TouchableOpacity>
        )}
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
  tag: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: '#373A42',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: '#373A42',
    flex: 1,
    marginBottom: 35,
  },
  radio: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
  },
  radioText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: '#373A42',
    marginLeft: 20,
    marginRight: 30,
  },
  picker: {
    height: '100%',
    width: '100%',
    color: '#373A42',
  },
  button: {
    marginTop: 30,
    padding: 15,
    width: '80%',
    backgroundColor: '#3366FF',
    borderRadius: 15,
    marginHorizontal: '10%',
    position: 'absolute',
    bottom: 10,
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
    marginBottom: 120,
  },
  imageContainer: {
    borderWidth: 4,
    borderColor: '#2395FF',
    borderRadius: 150,
    padding: 9,
    alignSelf: 'center',
    marginBottom: 30,
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
  dateContainer: {flexDirection: 'row'},
  date: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: '#373A42',
    marginRight: 20,
  },
  datePick: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: '#3366FF',
  },
  updateImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 35,
  },
  cameraContainer: {
    borderColor: '#C1C5D0',
    borderWidth: 2,
    borderRadius: 15,
    padding: 10,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  camera: {
    color: '#373A42',
  },
  galleryContainer: {
    borderColor: '#C1C5D0',
    borderWidth: 2,
    borderRadius: 15,
    padding: 10,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  gallery: {
    color: '#373A42',
  },
});
