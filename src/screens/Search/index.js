/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import IconBackup from 'react-native-vector-icons/Entypo';
import IconBackup2 from 'react-native-vector-icons/Feather';
import axios from '../../utilities/axios';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import {ActivityIndicator} from 'react-native-paper';

export default function Search(props) {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(10);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSort, setSelectedSort] = useState(1);
  const [order, setOrder] = useState(true);
  const [sort, setSort] = useState('name');
  const [key, setKey] = useState(props.route.params.search);

  useEffect(() => {
    getDataProduct();
  }, [key, page, sort, order, selectedLocation]);

  const getDataProduct = async () => {
    try {
      setLoading(true);
      if (page <= totalPage) {
        const result = await axios.get(
          `/api/event/?&sort=${sort}&order=${order}&page=${page}&limit=2&location=${selectedLocation}&key=${key}`,
        );
        if (page === 1) {
          setData(result.data.data);
        } else {
          setData([...data, ...result.data.data]);
        }
        setTotalPage(result.data.pagination.totalPage);
      } else {
        setLast(true);
      }
      setRefresh(false);
      setLoading(false);
      setLoadMore(false);
    } catch (error) {
      setLoading(false);
      setData([]);
    }
  };
  const handleRefresh = () => {
    setPage(1);
    setLast(false);
    if (page !== 1) {
      setRefresh(true);
    } else {
      getDataProduct();
    }
  };
  const handleLoadMore = () => {
    if (!loadMore) {
      // false
      const newPage = page + 1; // 1 + 1 = 2
      setLoadMore(true);
      if (newPage <= totalPage + 1) {
        setLoading(true);
        setPage(newPage);
      } else {
        setLoading(false);
      }
    }
  };
  const searchHandler = e => {
    setPage(1);
    setKey(e.nativeEvent.text);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.search}>
          <Icon name="search1" color="white" style={styles.logo} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search event..."
            placeholderTextColor="white"
            value={search}
            onChangeText={text => {
              setSearch(text);
            }}
            onSubmitEditing={searchHandler}
          />
          <TouchableOpacity
            style={styles.logo}
            onPress={() => {
              setSearch('');
            }}>
            <IconBackup2 name="x" color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.pickerBox}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedLocation}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => {
              setData([]);
              setPage(1);
              setSelectedLocation(itemValue);
              // formHandler(itemValue, 'profession');
            }}
            // onFocus={() => {
            //   setFocus(true);
            // }}
            // onBlur={() => {
            //   setFocus(false);
            // }}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item
              label="Jakarta"
              value="42fb3705-7edb-4b01-95c3-1486360a9348"
            />
            <Picker.Item
              label="Bandung"
              value="e584a694-d143-44b1-8e26-66fe7622f960"
            />
            <Picker.Item
              label="Bali"
              value="4b6ce6c6-1205-4333-9798-c5ebffa370bc"
            />
            <Picker.Item
              label="Aceh"
              value="0fc4a2fb-266d-4ac6-b8d7-060e2bb2ee7c"
            />
            <Picker.Item
              label="Solo"
              value="55dc78af-34b1-4887-8632-901516a700b7"
            />
            <Picker.Item
              label="Yogyakarta"
              value="2a27e1dc-8fbe-4184-a666-cf0bd7bd8243"
            />
            <Picker.Item
              label="Semarang"
              value="66e897a4-c784-497c-8b1f-bf90098695f1"
            />
            <Picker.Item
              label="Bandar Lampung"
              value="cb8dfda5-8698-47ef-bd25-01632ea70dc7"
            />
            <Picker.Item
              label="Surabaya"
              value="31efcdb3-878c-42a6-aafd-5bbeab149cf0"
            />
            <Picker.Item
              label="Medan"
              value="aa677212-f41b-4929-af85-5944457ffb89"
            />
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedSort}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => {
              setData([]);
              setPage(1);
              setSelectedSort(itemValue);
              if (itemValue === 1) {
                setSort('name');
                setOrder(true);
                return;
              }
              if (itemValue === 2) {
                setSort('name');
                setOrder(false);
                return;
              }
              if (itemValue === 3) {
                setSort('date');
                setOrder(true);
                return;
              }
              if (itemValue === 4) {
                setSort('date');
                setOrder(false);
                return;
              }
              // formHandler(itemValue, 'profession');
            }}
            // onFocus={() => {
            //   setFocus(true);
            // }}
            // onBlur={() => {
            //   setFocus(false);
            // }}
          >
            <Picker.Item label="Sort by Name Ascending" value={1} />
            <Picker.Item label="Sort by Name Descending" value={2} />
            <Picker.Item label="Sort by Date Ascending" value={3} />
            <Picker.Item label="Sort by Date Descending" value={4} />
          </Picker>
        </View>
      </View>
      <View style={styles.events}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Result for: {key}</Text>
          <Icon name="filter" style={styles.sort} />
        </View>
        {data.length > 0 ? (
          <FlatList
            style={styles.flatlist}
            horizontal
            data={data}
            numColumns="1"
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View stye={styles.imageContainer}>
                <Image
                  source={
                    item.image
                      ? {
                          uri: `https://res.cloudinary.com/starbillscloud/image/upload/v1663094115/${item.image} `,
                        }
                      : require('../../assets/Images/Image-2.png')
                  }
                  alt="poster"
                  style={styles.image}
                />
                <TouchableOpacity
                  style={styles.detailContainer}
                  onPress={() => {
                    props.navigation.navigate('Detail', {
                      image: item.image,
                      date: item.date_time_show,
                      location: item.location.name,
                      name: item.name,
                      detail: item.detail,
                      price: item.price,
                      id: item.id,
                    });
                  }}>
                  <Text style={styles.time}>
                    {moment(item.date_time_show).format('ddd, DD MMM h:mm A')}
                  </Text>
                  <Text style={styles.name}>{item.name}</Text>
                  <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() => {
                      props.navigation.navigate('Detail', {
                        image: item.image,
                        date: item.date_time_show,
                        location: item.location.name,
                        name: item.name,
                        detail: item.detail,
                        price: item.price,
                        id: item.id,
                      });
                    }}>
                    <Icon name="arrowright" style={styles.arrow} size={15} />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            )}
            onRefresh={handleRefresh}
            refreshing={refresh}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
          />
        ) : loading ? (
          <ActivityIndicator
            animating={true}
            color="#3366FF"
            size={35}
            style={styles.empty}
          />
        ) : (
          <View style={styles.empty}>
            <IconBackup name="emoji-sad" size={40} />
            <Text style={styles.title}>Sorry, Event Not Founds</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    height: '100%',
    width: '45%',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  picker: {
    color: 'black',
  },
  empty: {
    color: '#3366FF',
    paddingTop: 100,
    flexDirection: 'column',
    fontFamily: 'Poppins',
    fontWeight: '900',
    fontSize: 23,
    lineHeight: 21,
    letterSpacing: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {flex: 1, backgroundColor: 'white'},
  searchContainer: {
    backgroundColor: '#3366FF',
    paddingBottom: 50,
  },
  logo: {
    width: '10%',
    padding: 10,
  },
  search: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.5,
    color: 'white',
    paddingHorizontal: 20,
    width: '80%',
  },
  pickerBox: {
    backgroundColor: '#222B45',
    width: '100%',
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'relative',
    bottom: 25,
    paddingBottom: 50,
  },
  dateMidContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF8900',
    padding: 15,
    borderRadius: 10,
  },
  dateContainer: {alignItems: 'center', padding: 15, borderRadius: 10},
  date: {color: 'white'},
  dateMid: {color: '#FF8900'},
  events: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'relative',
    bottom: 55,
    backgroundColor: '#ffffff',
    height: '100%',
    color: 'black',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  title: {
    color: 'black',
    paddingTop: 25,
    flexDirection: 'column',
    fontFamily: 'Poppins',
    fontWeight: '900',
    fontSize: 23,
    lineHeight: 21,
    letterSpacing: 0.5,
  },
  sort: {
    color: '#3366FF',
    paddingTop: 25,
    flexDirection: 'column',
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.5,
  },
  flatlist: {},
  imageContainer: {
    marginHorizontal: 25,
    marginVertical: 25,
  },
  image: {
    borderRadius: 40,
    height: 400,
    width: 250,
    marginRight: 25,
    // marginVertical: 25,
  },
  detailContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    borderRadius: 40,
    padding: 20,
    height: 400,
    width: 250,
    backgroundColor: '#00000090',
  },
  time: {
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 10,
  },
  name: {
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 25,
    marginBottom: 10,
  },
  detailButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  arrow: {
    backgroundColor: '#FC1055',
    padding: 10,
    color: 'white',
    borderRadius: 10,
  },
  closing: {
    alignItems: 'center',
    color: '#FC1055',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
});
