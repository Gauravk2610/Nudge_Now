import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import WebView from 'react-native-webview';
import GluWebView from './GluWebView';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {selectAuth} from '../redux/features/authSlice';

const Home = ({navigation}: any): JSX.Element => {
  const {nudgeUserId} = useSelector(selectAuth);
  const [banner, setBanner] = useState('');
  const [event, setEvent] = useState('');
  const [userData, setUserData] = useState<any>({
    name: '',
    clientId: '',
    walletBalance: '',
  });

  const openWebView = () => {
    navigation.navigate('WebView');
  };

  console.log(nudgeUserId);

  const getData = async () => {
    const res = await axios.get(
      `https://gamification-test-repo-nabajit.onrender.com/users/?userId=${nudgeUserId}`,
    );
    console.log(res.data);
    setUserData(res.data.data);
  };

  const getUser = async () => {
    try {
      const res = await axios.post(
        `https://game.api.nudgenow.in/users`,
        {
          name: 'Gaurav',
          email: 'gauravkonde@nudgenow.in',
          externalId: '12349',
        },
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZjZDI5NmM0OTUxMjc3NWU0OTVlOTEiLCJuYW1lIjoiTmFiYWppdCIsImVtYWlsIjoibmFiYWppdEBudWRnZW5vdy5pbiIsImlhdCI6MTY3NzUxMzM2Nn0.6oFuTIPbMCcVRVa8-soTfKad_iPlwnuxB1tammWclcc',
          },
        },
      );
      console.log(res.data);
      if (res.data.data) {
        navigation.navigate('MultiLevelWebView', {
          link: 'https://nudge-game-website.vercel.app/multilevel?campaignId=63ff4189bbaebe63926346f1&clientId=63ff3456b351b8887dae4429&userId=63ff4257ddf0828ddc9845f7&gameSettingId=63ff3e08bbaebe6392634681&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZmMzQ1NmIzNTFiODg4N2RhZTQ0MjkiLCJuYW1lIjoiR2F1cmF2IEtvbmRlIiwiZW1haWwiOiJnYXVyYXZrb25kZTI2QGdtYWlsLmNvbSIsImlhdCI6MTY3NzY2OTQ2Mn0.kP5JnwJnTCxg9VfD1qrXK8_O28tiT35gHY8L8b3ee7Y',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getEvent = async () => {
    try {
      const res = await axios.post(
        'https://gameserver.api.nudgenow.in/events',
        {
          nudgeUserId: nudgeUserId,
          eventKey: 'nps_button',
        },
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE5NjU4NzgzMzg4NjIxZmEyOGJhY2YiLCJuYW1lIjoiRGVtbyIsImVtYWlsIjoiZGVtb2Rhc2hib2FyZEBudWRnZW5vdy5pbiIsImlhdCI6MTY3OTM4NTk5MX0.GkDxdraZYRQBiV3eGMEEOHDf3wai8Vd8v7cRAqwSte8',
          },
        },
      );
      console.log(res.data);
      setEvent(res.data.data.gameUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const getBanner = async () => {
    try {
      const res = await axios.post(
        `https://game.api.nudgenow.in/events/pre_task`,
        {
          eventKey: 'banner',
          nudgeUserId: '63ff4257ddf0828ddc9845f7',
          campaignId: '63ff4189bbaebe63926346f1',
          eventProps: {},
        },
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZmMzQ1NmIzNTFiODg4N2RhZTQ0MjkiLCJuYW1lIjoiR2F1cmF2IEtvbmRlIiwiZW1haWwiOiJnYXVyYXZrb25kZTI2QGdtYWlsLmNvbSIsImlhdCI6MTY3NzY2OTQ2Mn0.kP5JnwJnTCxg9VfD1qrXK8_O28tiT35gHY8L8b3ee7Y',
          },
        },
      );
      setBanner(res?.data?.data?.banner?.props?.imageUrl);
      console.log(res?.data?.data);
      // if (res.data.data) {
      //   navigation.navigate('MultiLevelWebView', {
      //     link: 'https://nudge-game-website.vercel.app/multilevel?campaignId=63ff4189bbaebe63926346f1&clientId=63ff3456b351b8887dae4429&userId=63ff4257ddf0828ddc9845f7&gameSettingId=63ff3e08bbaebe6392634681&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZmMzQ1NmIzNTFiODg4N2RhZTQ0MjkiLCJuYW1lIjoiR2F1cmF2IEtvbmRlIiwiZW1haWwiOiJnYXVyYXZrb25kZTI2QGdtYWlsLmNvbSIsImlhdCI6MTY3NzY2OTQ2Mn0.kP5JnwJnTCxg9VfD1qrXK8_O28tiT35gHY8L8b3ee7Y',
      //   });
      // }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEvent();
    // getData()
    // getUser();
    // getBanner();
  }, [navigation, nudgeUserId]);

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://www.nudgenow.in/assets/Logo.png',
          }}
          resizeMode="contain"
          style={{
            width: '50%',
            height: 140,
          }}
        />
        {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate('MultiLevelWebView', {
              link: 'https://nudge-game-website.vercel.app/multilevel?campaignId=63ff4189bbaebe63926346f1&clientId=63ff3456b351b8887dae4429&userId=63ff4257ddf0828ddc9845f7&gameSettingId=63ff3e08bbaebe6392634681&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZmMzQ1NmIzNTFiODg4N2RhZTQ0MjkiLCJuYW1lIjoiR2F1cmF2IEtvbmRlIiwiZW1haWwiOiJnYXVyYXZrb25kZTI2QGdtYWlsLmNvbSIsImlhdCI6MTY3NzY2OTQ2Mn0.kP5JnwJnTCxg9VfD1qrXK8_O28tiT35gHY8L8b3ee7Y',
            })
          }
          style={{
            width: '100%',
            height: 160,
            backgroundColor: 'grey',
            borderRadius: 12,
          }}>
          <Image
            source={{
              uri: banner
                ? banner
                : 'https://images.pexels.com/photos/1001990/pexels-photo-1001990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 12,
            }}
          />
        </TouchableOpacity> */}
        <Text style={styles.header}>Home</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#000',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
          onPress={() => navigation.navigate('AddUser')}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
            }}>
            Add User
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            backgroundColor: '#000',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
          onPress={openWebView}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
            }}>
            Open WebView
          </Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={{
            backgroundColor: '#000',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
          onPress={() =>
            navigation.navigate('MultiLevelWebView', {
              link: 'https://nudge-game-website.vercel.app/multilevel?campaignId=63ff4189bbaebe63926346f1&clientId=63ff3456b351b8887dae4429&userId=63ff4257ddf0828ddc9845f7&gameSettingId=63ff3e08bbaebe6392634681&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZmMzQ1NmIzNTFiODg4N2RhZTQ0MjkiLCJuYW1lIjoiR2F1cmF2IEtvbmRlIiwiZW1haWwiOiJnYXVyYXZrb25kZTI2QGdtYWlsLmNvbSIsImlhdCI6MTY3NzY2OTQ2Mn0.kP5JnwJnTCxg9VfD1qrXK8_O28tiT35gHY8L8b3ee7Y',
            })
          }>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
            }}>
            Open Multi WebView
          </Text>
        </TouchableOpacity> */}
        {event && (
          <TouchableOpacity
            style={{
              backgroundColor: '#000',
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            onPress={() =>
              navigation.navigate('MultiLevelWebView', {
                link:
                  event +
                  `&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE5NjU4NzgzMzg4NjIxZmEyOGJhY2YiLCJuYW1lIjoiRGVtbyIsImVtYWlsIjoiZGVtb2Rhc2hib2FyZEBudWRnZW5vdy5pbiIsImlhdCI6MTY3OTM4NTk5MX0.GkDxdraZYRQBiV3eGMEEOHDf3wai8Vd8v7cRAqwSte8`,
              })
            }>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
              }}>
              Open NPS Survey
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* <View
        style={{
          marginTop: 20,
        }}>
        <Text style={styles.header}>User Details</Text>
        <Text
          style={{
            color: '#000',
          }}>
          {userData?.name}
        </Text>
        <Text
          style={{
            color: '#000',
          }}>
          {userData?.email}
        </Text>
        <Text
          style={{
            color: '#000',
          }}>
          {userData?.walletBalance}
        </Text>
      </View> */}
      {/* <WebView
        source={{uri: 'https://www.google.com'}}
        style={{marginTop: 20}}
      /> */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingTop: 6,
    paddingHorizontal: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
});
