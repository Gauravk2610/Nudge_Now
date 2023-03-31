import React from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux"
import { selectAuth } from "../redux/features/authSlice"
import axios from "axios";

export default function GluWebView({ navigation }: any) {

  const { userId } = useSelector(selectAuth)

  /* Callback for the WebView */
  function onWebViewEvent(event: WebViewMessageEvent) {
    const data: IWebViewEvent = JSON.parse(event.nativeEvent.data);
    console.log(data, "DATA");
  }

  const addWalletValue = async (value: any) => {
    const res = await axios.post('https://api.nudgenow.in/users/wallet/credit', {
      userId: userId,
      amount: Number(value)
    })
    console.log(res.data, "RESULT")
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: `http://192.168.0.103:3000/?user_id=63cfd6097390e6bc60f38046` }}
        onMessage={
            (event) => {
                if (event.nativeEvent.data) {
                  console.log(event.nativeEvent.data, "EVENT")
                  addWalletValue(event.nativeEvent.data)
                    navigation.navigate('Home')
                }
                console.log(event, "EVEVNT")
            }
        } /* Pass the callback (line: 34) defined as props */
        renderLoading={() => (
          <Text style={styles.text}>Loading Webview...</Text>
        )}
        renderError={() => (
          <Text style={styles.text}>Error Loading Webview...</Text>
        )}
        startInLoadingState
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

type IWebViewEvent = IOpenDeepLinkEvent | ICloseEvent | IShareEvent;

interface IOpenDeepLinkEvent {
  eventName: "OPEN_DEEPLINK";
  data: {
    deepLink: string;
    name: string;
  };
}

interface ICloseEvent {
  eventName: "CLOSE";
}

interface IShareEvent {
  eventName: "SHARE";
  data: {
    channelName: "WHATSAPP" | "SMS" | "EMAIL" | "OTHERS";
    text: string;
    image: string;
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
});