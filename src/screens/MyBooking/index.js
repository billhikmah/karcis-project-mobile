/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {getBookingAction} from '../../store/action/booking';
import moment from 'moment';
import {Button, Paragraph, Dialog, Portal, Provider} from 'react-native-paper';

export default function Booking(props) {
  const booking = useSelector(state => state.booking.data);
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState({
    name: '',
    status: '',
    total_payment: '',
    total_ticket: '',
    section: [],
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookingAction());
  }, []);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <Provider style={styles.body}>
      <View style={styles.block} />
      {booking.length > 0 ? (
        <ScrollView style={styles.container}>
          {booking.reverse().map((item, index) => {
            return (
              <View style={styles.itemContainer} key={index}>
                <View style={styles.upperContainer}>
                  <View style={styles.upperLeftContainer}>
                    <Text style={styles.date}>
                      {moment(item.event_id.date_time_show).format('DD')}
                    </Text>
                    <Text style={styles.day}>
                      {moment(item.event_id.date_time_show).format('ddd')}
                    </Text>
                  </View>
                  <View style={styles.upperRightContainer}>
                    <Text style={styles.title}>{item.event_id.name}</Text>
                  </View>
                </View>
                <View style={styles.lowerContainer}>
                  <View style={styles.lowerLeftContainer} />
                  <View>
                    <Text style={styles.location}>
                      {item.event_id.location.name}, Indonesia
                    </Text>
                    <Text style={styles.time}>
                      {moment(item.event_id.date_time_show).format(
                        'ddd, DD MMM h:mm A',
                      )}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        const section = [];
                        item.booking_section.map(element => {
                          return section.push(element.section);
                        });
                        setDetail({
                          name: item.event_id.name,
                          status: item.payment_status,
                          total_payment: item.total_payment,
                          total_ticket: item.total_ticket,
                          section,
                        });
                        showDialog();
                      }}>
                      <Text style={styles.detail}>Detail</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No tickets bought</Text>
          <Text style={styles.emptyText}>
            It appears you haven’t bought any tickets yet.
          </Text>
          <Text style={styles.emptyText}>Maybe try searching these?</Text>
        </View>
      )}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{detail.name}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Status: {detail.status}</Paragraph>
            <Paragraph>Total Ticket: {detail.total_ticket}</Paragraph>
            <Paragraph>Total Payment: {detail.total_payment}</Paragraph>
            <Paragraph>
              Section:{' '}
              {detail.section.map((item, index) => {
                if (index === detail.section.length - 1) {
                  return `${item}.`;
                }
                return `${item}, `;
              })}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
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
    marginBottom: 10,
  },
  detail: {
    fontFamily: 'Poppins',
    fontSize: 15,
    color: '#3366FF',
  },
});
