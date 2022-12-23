import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  ActivityIndicator,
} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import axios from '../../utilities/axios';
import {getBookingAction} from '../../store/action/booking';

export default function Payment(props) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const data = props.route.params;

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    dispatch(getBookingAction());
    props.navigation.replace('MenuNavigator');
  };

  const createBooking = async () => {
    try {
      setIsLoading(true);
      const dataSection = Object.keys(data.section);
      let section = [];
      dataSection.map(item => {
        for (let index = 0; index < data.section[item]; index++) {
          section.push(item);
        }
      });
      const form = {
        event_id: data.id,
        total_payment: data.total.totalPrice,
        payment_method: 'c1e6455e-96e5-4284-8fc4-921273061752',
        payment_status: 'success',
        section,
      };
      await axios.post('/api/booking/', form);
      showDialog();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data);
    }
  };

  return (
    <Provider style={styles.body}>
      <View style={styles.block} />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Ticket Detail</Text>
        <View style={styles.detail}>
          <Text style={styles.detailKey}>Events</Text>
          <Text style={styles.detailValue}>{data.name}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailKey}>Quantity</Text>
          <Text style={styles.detailValue}>{data.total.totalTicket}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailKey}>Total Payment</Text>
          <Text style={styles.detailValue}>Rp {data.total.totalPrice}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View>
          <Text style={styles.detailTitle}>Total Payment</Text>
          <Text style={styles.buttonDetail}>Rp {data.total.totalPrice}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={createBooking}>
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              size={15}
              color="white"
              style={styles.buttonText}
            />
          ) : (
            <Text style={styles.buttonText}>Pay</Text>
          )}
        </TouchableOpacity>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Payment Success</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Check my booking to see the details</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
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
  title: {
    fontSize: 30,
    fontFamily: 'Poppins',
    color: '#373A42',
    marginBottom: 25,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailKey: {
    fontSize: 20,
    fontFamily: 'Poppins',
    color: '#373A42',
  },
  detailValue: {
    fontSize: 20,
    fontFamily: 'Poppins',
    color: '#3366FF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 20,
    fontFamily: 'Poppins',
    color: '#373A42',
  },
  buttonDetail: {
    width: '100%',
    color: '#3366FF',
    fontFamily: 'Poppins',
    fontSize: 25,
  },
  button: {
    backgroundColor: '#3366FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '40%',
    height: 55,
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: 20,
    color: 'white',
  },
});
