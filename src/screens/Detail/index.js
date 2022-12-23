import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconBackup from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import axios from '../../utilities/axios';
import {useDispatch} from 'react-redux';
import {getWishlistAction} from '../../store/action/wishlist';

export default function Detail(props) {
  const [addToWishlist, setAddToWishlist] = useState(true);
  const [wishlistId, setWishlistId] = useState('');
  const dispatch = useDispatch();
  const data = props.route.params;

  const backHandler = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    getWishlistById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWishlistById = async () => {
    try {
      const result = await axios.get(`/api/wishlist/${data.id}`);
      if (result.data.data.length > 0) {
        setAddToWishlist(false);
        setWishlistId(result.data.data[0].id);
      }
    } catch (error) {
      setAddToWishlist(true);
    }
  };
  const createWishlist = async () => {
    try {
      const body = {event_id: data.id};
      const result = await axios.post('/api/wishlist/', body);
      setWishlistId(result.data.data[0].id);
      setAddToWishlist(false);
      dispatch(getWishlistAction());
    } catch (_) {
      dispatch(getWishlistAction());
      setAddToWishlist(true);
    }
  };
  const deleteWishlist = async () => {
    try {
      await axios.delete(`/api/wishlist/${wishlistId}`);
      setAddToWishlist(true);
      dispatch(getWishlistAction());
    } catch (_) {
      setAddToWishlist(false);
      dispatch(getWishlistAction());
    }
  };
  const wishlistHandler = async () => {
    if (addToWishlist) {
      createWishlist();
    }
    if (!addToWishlist) {
      deleteWishlist();
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.header}>
          <Icon name="arrow-left" style={styles.icon} onPress={backHandler} />
          {!addToWishlist ? (
            <TouchableOpacity onPress={wishlistHandler}>
              <IconBackup name="heart" style={styles.icon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={wishlistHandler}>
              <IconBackup name="heart-o" style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={
              data.image
                ? {
                    uri: `https://res.cloudinary.com/starbillscloud/image/upload/v1663094115/${data.image} `,
                  }
                : require('../../assets/Images/Image-2.png')
            }
            // style={{width: 400, height: 400}}
            alt="poster"
            style={styles.image}
          />
          <View style={styles.detailContainer}>
            <Text style={styles.name}>{data.name}</Text>
            <View style={styles.locationContainer}>
              <Icon name="map-pin" style={styles.logo} />
              <Text style={styles.location}>{data.location}, Indonesia</Text>
            </View>
            <View style={styles.timeContainer}>
              <Icon name="clock" style={styles.logo} />
              <Text style={styles.time}>
                {moment(data.date).format('ddd, DD MMM h:mm A')}
              </Text>
            </View>
            <Text style={styles.attendees}>Attendees</Text>
            <Image
              source={require('../../assets/Images/Image-3.png')}
              alt="attendees"
            />
          </View>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>Event Detail</Text>
          <Text style={styles.desc}>{data.detail}</Text>
        </View>
        <View style={styles.map}>
          <Text style={styles.mapTitle}>Location</Text>
          <Image
            source={require('../../assets/Images/Image-4.png')}
            style={styles.mapImage}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.buyContainer}
        onPress={() => {
          props.navigation.navigate('Order', {
            id: data.id,
            price: data.price,
            name: data.name,
          });
        }}>
        <Text style={styles.buy}>Buy</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: 20,
    zIndex: 10,
    position: 'absolute',
    width: '100%',
  },
  icon: {color: 'white', fontSize: 35},
  imageContainer: {
    backgroundColor: '#000000a0',
  },
  image: {
    width: '100%',
    height: 500,
  },
  detailContainer: {
    padding: 20,
    position: 'absolute',
    paddingTop: 150,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000a0',
  },
  name: {
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 33,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  logo: {
    color: '#FC1055',
    paddingRight: 10,
    fontSize: 25,
    width: 40,
    textAlign: 'center',
  },
  location: {
    fontFamily: 'Poppins',
    fontSize: 20,
    color: 'white',
  },
  timeContainer: {
    flexDirection: 'row',
    color: 'white',
    marginBottom: 30,
  },
  time: {
    fontFamily: 'Poppins',
    color: 'white',
    fontSize: 20,
  },
  attendees: {
    fontFamily: 'Poppins',
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  detail: {
    backgroundColor: '#192038',
    position: 'relative',
    bottom: 25,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 50,
  },
  detailTitle: {
    fontFamily: 'Poppins',
    fontSize: 22,
    marginBottom: 10,
    color: 'white',
  },
  desc: {
    fontFamily: 'Poppins',
    fontSize: 15,
    marginBottom: 10,
    color: '#C1C5D0',
  },
  map: {
    backgroundColor: '#FFF',
    position: 'relative',
    bottom: 50,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 50,
  },
  mapTitle: {
    fontFamily: 'Poppins',
    fontSize: 22,
    marginBottom: 10,
    color: '#373A42',
  },
  mapImage: {
    width: '100%',
    borderRadius: 30,
  },
  buyContainer: {
    backgroundColor: '#3366FF',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 15,
    position: 'absolute',
    bottom: 10,
  },
  buy: {
    fontFamily: 'Poppins',
    fontSize: 25,
    color: 'white',
  },
});
