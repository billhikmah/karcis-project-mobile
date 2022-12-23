/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconBackup from 'react-native-vector-icons/Fontisto';
import axios from '../../utilities/axios';

export default function Booking(props) {
  const {id, price, name} = props.route.params;
  const [listBooking, setListBooking] = useState([]);
  const [checkout, setCheckout] = useState({VVIP: 0, VIP: 0, REG: 0});
  const [total, setTotal] = useState({
    totalPrice: 0,
    totalTicket: 0,
  });
  const [section, setSection] = useState({});

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    countTotal();
  }, [checkout]);

  const getData = async () => {
    try {
      const section = await axios.get(`/api/booking/section/${id}`);
      const seat = [
        {
          type: 'VVIP',
          section: 1,
        },
        {type: 'VIP', section: 7},
        {type: 'REG', section: 9},
      ];
      const result = seat.map(item => {
        let data = [];
        for (let i = 1; i <= 4; i++) {
          for (let j = 1; j <= item.section; j++) {
            const filterSeat = section.data.data.filter(
              dataSeat => dataSeat.section === `${item.type}${i}-${j}`,
            );
            const checkData = data.filter(
              dataAvailable => dataAvailable.type === item.type,
            );
            if (checkData.length < 1) {
              if (filterSeat.length < 1) {
                data.push({
                  type: item.type,
                  section: `${item.type}${i}-${j}`,
                  available: item.type.includes('VVIP')
                    ? 10
                    : item.type.includes('VIP')
                    ? 20
                    : 30,
                });
              }
              if (filterSeat.length > 0 && !filterSeat[0]?.statusFull) {
                data.push({
                  type: filterSeat[0].section.includes('VVIP')
                    ? 'VVIP'
                    : item.type.includes('VIP')
                    ? 'VIP'
                    : 'REG',
                  section: filterSeat[0].section,
                  available: filterSeat[0].available,
                });
              }
            }
          }
        }
        return data;
      });
      const newResult = result.map(item => item[0]);
      setListBooking(newResult);
    } catch (error) {
      const section = [];
      const seat = [
        {
          type: 'VVIP',
          section: 1,
        },
        {type: 'VIP', section: 7},
        {type: 'REG', section: 9},
      ];
      const result = seat.map(item => {
        let data = [];
        for (let i = 1; i <= 4; i++) {
          for (let j = 1; j <= item.section; j++) {
            const filterSeat = section.filter(
              dataSeat => dataSeat.section === `${item.type}${i}-${j}`,
            );
            const checkData = data.filter(
              dataAvailable => dataAvailable.type === item.type,
            );
            if (checkData.length < 1) {
              if (filterSeat.length < 1) {
                data.push({
                  type: item.type,
                  section: `${item.type}${i}-${j}`,
                  available: item.type.includes('VVIP')
                    ? 10
                    : item.type.includes('VIP')
                    ? 20
                    : 30,
                });
              }
              if (filterSeat.length > 0 && !filterSeat[0]?.statusFull) {
                data.push({
                  type: filterSeat[0].section.includes('VVIP')
                    ? 'VVIP'
                    : item.type.includes('VIP')
                    ? 'VIP'
                    : 'REG',
                  section: filterSeat[0].section,
                  available: filterSeat[0].available,
                });
              }
            }
          }
        }
        return data;
      });
      const newResult = result.map(item => item[0]);
      setListBooking(newResult);
    }
  };
  const countTotal = () => {
    const totalTicket = checkout.VVIP + checkout.VIP + checkout.REG;
    const totalPrice =
      checkout.VVIP * price * 3 +
      checkout.VIP * price * 2 +
      checkout.REG * price;

    setTotal({
      ...total,
      totalPrice,
      totalTicket,
    });
  };

  return (
    <View style={styles.body}>
      <View style={styles.block} />
      <ScrollView style={styles.container}>
        <View style={styles.seatsContainer}>
          <Image
            source={require('../../assets/Vectors/seats.png')}
            style={styles.seats}
          />
        </View>
        <Text style={styles.title}>Tickets</Text>
        {listBooking.map((item, index) => {
          return (
            <View style={styles.sectionContainer} key={index}>
              <Image
                source={
                  item.type === 'VVIP'
                    ? require('../../assets/Vectors/section-logo-3.png')
                    : item.type === 'VIP'
                    ? require('../../assets/Vectors/section-logo-2.png')
                    : require('../../assets/Vectors/section-logo-1.png')
                }
                style={styles.sectionLogo}
              />
              <View style={styles.sectionDetailMid}>
                <Text style={styles.sectionName}>SECTION {item.section}</Text>
                <Text style={styles.sectionSeat}>
                  {item.available} Seats available
                </Text>
                <Text style={styles.sectionQuantity}>Quantity</Text>
              </View>
              <View style={styles.sectionDetailRight}>
                <Text style={styles.sectionPrice}>
                  Rp{' '}
                  {item.type === 'VVIP'
                    ? price * 3
                    : item.type === 'VIP'
                    ? price * 2
                    : price}
                </Text>
                <Text style={styles.priceDetail}>per person</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => {
                      if (item.type === 'VVIP') {
                        if (checkout.VVIP === 0) {
                          return;
                        }
                        setSection({
                          ...section,
                          [item.section]: checkout.VVIP - 1,
                        });
                        setCheckout({
                          ...checkout,
                          VVIP: checkout.VVIP - 1,
                        });
                        return;
                      }
                      if (item.type === 'VIP') {
                        if (checkout.VIP === 0) {
                          return;
                        }
                        setSection({
                          ...section,
                          [item.section]: checkout.VIP - 1,
                        });
                        setCheckout({
                          ...checkout,
                          VIP: checkout.VIP - 1,
                        });
                        return;
                      }
                      if (checkout.REG === 0) {
                        return;
                      }
                      setSection({
                        ...section,
                        [item.section]: checkout.REG - 1,
                      });
                      setCheckout({
                        ...checkout,
                        REG: checkout.REG - 1,
                      });
                      return;
                    }}>
                    <Icon name="minus" size={20} />
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>
                    {item.type === 'VVIP'
                      ? checkout.VVIP
                      : item.type === 'VIP'
                      ? checkout.VIP
                      : checkout.REG}
                  </Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => {
                      if (item.type === 'VVIP') {
                        setSection({
                          ...section,
                          [item.section]: checkout.VVIP + 1,
                        });
                        setCheckout({
                          ...checkout,
                          VVIP: checkout.VVIP + 1,
                        });
                        return;
                      }
                      if (item.type === 'VIP') {
                        if (checkout.VIP === item.available) {
                          return;
                        }
                        setSection({
                          ...section,
                          [item.section]: checkout.VIP + 1,
                        });
                        setCheckout({
                          ...checkout,
                          VIP: checkout.VIP + 1,
                        });
                        return;
                      }
                      if (checkout.REG === item.available) {
                        return;
                      }
                      setSection({
                        ...section,
                        [item.section]: checkout.REG + 1,
                      });
                      setCheckout({
                        ...checkout,
                        REG: checkout.REG + 1,
                      });
                      return;
                    }}>
                    <Icon name="plus" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
        <View style={styles.checkoutContainer}>
          <View style={styles.checkoutDetail}>
            <Text style={styles.checkoutTotal}>
              <IconBackup name="ticket" /> {total.totalTicket} • Rp{' '}
              {total.totalPrice}
            </Text>
            <Text style={styles.checkoutText}>Get now on Karcis</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              if (total.totalTicket <= 0) {
                ToastAndroid.show(
                  'Please select at least one item',
                  ToastAndroid.SHORT,
                );
                return;
              }
              props.navigation.navigate('Payment', {
                total,
                name,
                id,
                section,
              });
            }}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    paddingHorizontal: 20,
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
  },
  seatsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 30,
    color: '#373A42',
    marginBottom: 20,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  sectionLogo: {
    width: 60,
    height: 60,
  },
  sectionDetailRight: {
    alignItems: 'flex-end',
  },
  sectionName: {
    fontFamily: 'Poppins',
    fontSize: 20,
    color: '#373A42',
  },
  sectionSeat: {
    fontFamily: 'Poppins',
    fontSize: 15,
    color: '#C1C5D0',
    marginBottom: 10,
  },
  sectionQuantity: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#373A42',
  },
  sectionPrice: {
    fontFamily: 'Poppins',
    fontSize: 20,
    color: '#373A42',
  },
  priceDetail: {
    fontFamily: 'Poppins',
    fontSize: 15,
    color: '#C1C5D0',
    marginBottom: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counterButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#C1C5D0',
    borderRadius: 5,
  },
  counterValue: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#373A42',
    width: 50,
    textAlign: 'center',
  },
  checkoutContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  checkoutDetail: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  checkoutTotal: {
    fontFamily: 'Poppins',
    fontSize: 20,
    color: '#373A42',
  },
  checkoutText: {
    fontFamily: 'Poppins',
    fontSize: 15,
    color: '#C1C5D0',
  },
  checkoutButton: {
    backgroundColor: '#3366FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '40%',
  },
  checkoutButtonText: {
    fontFamily: 'Poppins',
    fontSize: 20,
    color: 'white',
  },
});
