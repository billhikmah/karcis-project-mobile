/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {useDispatch, useSelector} from 'react-redux';
import {getWishlistAction} from '../../store/action/wishlist';
import axios from '../../utilities/axios';
import moment from 'moment';

export default function Wishlist(props) {
  const wishlist = useSelector(state => state.wishlist.data);
  const dispatch = useDispatch();

  useEffect(() => {
    getWishlist();
  }, []);
  const getWishlist = async () => {
    try {
      await dispatch(getWishlistAction());
    } catch (_) {}
  };
  const deleteWishlist = async id => {
    try {
      await axios.delete(`/api/wishlist/${id}`);
      await dispatch(getWishlistAction());
    } catch (error) {
      ToastAndroid.show('Error, please try again.', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.block} />
      {/* <Text>s</Text> */}
      {/* </View> */}
      {wishlist.length > 0 ? (
        <ScrollView style={styles.container}>
          {wishlist.map((item, index) => {
            return (
              <View style={styles.itemContainer} key={index}>
                <View style={styles.upperContainer}>
                  <View style={styles.upperLeftContainer}>
                    <Text style={styles.date}>
                      {moment(item.date_time_show).format('DD')}
                    </Text>
                    <Text style={styles.day}>
                      {moment(item.date_time_show).format('ddd')}
                    </Text>
                  </View>
                  <View style={styles.upperRightContainer}>
                    <Text style={styles.title}>{item.event_id.name}</Text>
                  </View>
                </View>
                <View style={styles.lowerContainer}>
                  <TouchableOpacity
                    style={styles.lowerLeftContainer}
                    onPress={() => {
                      deleteWishlist(item.id);
                    }}>
                    <Icon
                      name="heart"
                      style={styles.icon}
                      size={30}
                      color="#3366FF"
                    />
                  </TouchableOpacity>
                  <View>
                    <Text style={styles.location}>
                      {item.event_id.location.name}, Indonesia
                    </Text>
                    <Text style={styles.time}>
                      {moment(item.event_id.date_time_show).format(
                        'ddd, DD MMM h:mm A',
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No event found</Text>
          <Text style={styles.emptyText}>
            It appears you haven’t wish any events yet.
          </Text>
          <Text style={styles.emptyText}>Maybe try searching these?</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#3366FF',
    height: '100%',
  },
  emptyContainer: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#373A42',
    marginBottom: 20,
  },
  emptyText: {
    fontFamily: 'Poppins',
    fontSize: 15,
    color: '#B3B8B8',
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
    paddingHorizontal: 50,
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
  },
  itemContainer: {
    borderBottomColor: '#C1C5D0',
    borderBottomWidth: 0.5,
    paddingVertical: 20,
  },
  upperContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  upperLeftContainer: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  date: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FF8900',
  },
  day: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#C1C5D0',
  },
  upperRightContainer: {
    flexShrink: 1,
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    letterSpacing: 3,
    fontSize: 35,
    color: '#373A42',
  },
  lowerContainer: {
    flexDirection: 'row',
  },
  lowerLeftContainer: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  location: {
    fontFamily: 'Poppins',
    fontSize: 15,
    color: '#C1C5D0',
  },
  time: {
    fontFamily: 'Poppins',
    fontSize: 15,
    color: '#C1C5D0',
  },
});
