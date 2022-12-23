/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import IconBackup from 'react-native-vector-icons/Feather';
import axios from '../../utilities/axios';
import moment from 'moment';

export default function Home(props) {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(10);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [dateShow, setDateShow] = useState(moment().format('YYYY-MM-DD'));
  const [listDateShow, setListDateShow] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getDataProduct();
  }, []);

  useEffect(() => {
    getDataProduct();
  }, [page, dateShow]);

  useEffect(() => {
    generateDate();
  }, [dateShow]);

  const generateDate = () => {
    let listDate = [
      moment(dateShow).subtract(2, 'days'),
      moment(dateShow).subtract(1, 'days'),
      dateShow,
      moment(dateShow).subtract(-1, 'days'),
      moment(dateShow).subtract(-2, 'days'),
    ];
    setListDateShow(listDate);
  };
  const selectDate = date => {
    setDateShow(date);
    setPage(1);
    setData([]);
  };
  const getDataProduct = async () => {
    try {
      if (page <= totalPage) {
        const result = await axios.get(
          `/api/event/?sort=name&order=true&page=${page}&limit=2&date=${dateShow}`,
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
    props.navigation.navigate('Search', {search: e.nativeEvent.text});
  };

  return (
    <View style={styles.container}>
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
            <IconBackup name="x" color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sortDateContainer}>
        {listDateShow.map((item, index) => {
          if (index === 2) {
            return (
              <TouchableOpacity
                style={styles.dateMidContainer}
                key={index}
                onPress={() => {
                  selectDate(moment(item).format('YYYY-MM-DD'));
                }}>
                <Text style={styles.dateMid}>{moment(item).format('DD')}</Text>
                <Text style={styles.dateMid}>{moment(item).format('ddd')}</Text>
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              style={styles.dateContainer}
              key={index}
              onPress={() => {
                selectDate(moment(item).format('YYYY-MM-DD'));
              }}>
              <Text style={styles.date}>{moment(item).format('DD')}</Text>
              <Text style={styles.date}>{moment(item).format('ddd')}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.events}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Events For You</Text>
          <Icon name="filter" style={styles.sort} />
        </View>
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
          // ListHeaderComponent={ListHeader}
          // ListFooterComponent={() => (
          //   <View>
          //     {last ? (
          //       <Text style={styles.closing}>No more data available</Text>
          //     ) : loading ? (
          //       <ActivityIndicator size="large" color="blue" />
          //     ) : null}
          //   </View>
          // )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  searchContainer: {
    backgroundColor: '#3366FF',
    paddingBottom: 50,
  },
  search: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: '10%',
    padding: 10,
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
  sortDateContainer: {
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
    backgroundColor: '#FFFFFF',
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
