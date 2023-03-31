/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import GluWebView from './src/screens/GluWebView';
import Toast from 'react-native-toast-message';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/redux/store';
import { selectAuth } from './src/redux/features/authSlice';
import MultiLevelWebView from './src/screens/MultiLevelWebView';
import AddUser from './src/screens/AddUser';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  
  const RootNavigator = () => {
    const auth = useSelector(selectAuth)
    return (
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
        >
          {
            !auth?.clientId &&
            <Stack.Group>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Group>
            // :
          }
            <Stack.Group>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="WebView" component={GluWebView} />
              <Stack.Screen name="AddUser" component={AddUser} />
              <Stack.Screen name="MultiLevelWebView" component={MultiLevelWebView} />
            </Stack.Group>
          {/* } */}
      </Stack.Navigator>
    </NavigationContainer>
    )
  }

  return (
    <React.Fragment>
      <Toast />
      <Provider store={store}>
        <RootNavigator />
          </Provider>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
