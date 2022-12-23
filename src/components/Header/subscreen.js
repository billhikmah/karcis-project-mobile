import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function HomeHeader(props) {
  const openDrawer = () => {
    props.navigation.goBack();
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={openDrawer}>
        <Icon name="arrow-left" color={'white'} size={35} />
      </TouchableOpacity>
      <View style={styles.item}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View>
        <Text />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#3366FF',
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  item: {
    width: '80%',
    alignSelf: 'center',
  },
});
