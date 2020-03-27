import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  Image
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import Firebase from "../components/config";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "react-native-elements";
import Swipeout from "react-native-swipeout";

function Separator() {
  return <View style={styles.separator} />;
}

export default class Homescreen extends Component {
  state = { notification: [], delete: "" };

  _handleNotification = (notification) => {
    let a = notification.data;
    
    Object.keys(a).forEach(key => {
      console.log(a[key]);
      this.setState({
        notification: a[key],
        delete: "Delete"
      });
      
    });
    AsyncStorage.getItem("notificationList").then(val => {
      let notificationArray = [];
      let message =this.state.notification[0];
      if (val != null && val != "") {
        notificationArray = JSON.parse(val);
        console.log(this.state.notification);
        
        notificationArray.push(message);
        AsyncStorage.setItem(
          "notificationList",
          JSON.stringify(notificationArray)
        );
      } else {
        notificationArray.push(message);
        AsyncStorage.setItem("notificationList", JSON.stringify(notificationArray));
      }
      
    })
    
    .catch(error => {
      console.log(" Error : " + error);
      AsyncStorage.setItem("notificationList", JSON.stringify(notificationArray));
    });
    
  };
  deleteNotification = () => {
    this.setState({
      notification: "",
      delete: ""
    });
  };
  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  registerForPushNotificationsAsync = async () => {
    if (Constants.platform.ios || Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (status !== "granted") {
        Alert.alert("No notification permissions!");
        return;
      }
    }
    let token = await Notifications.getExpoPushTokenAsync();
    this.setState({
      token: token
    });
    let db_token = [];
    Firebase.database()
      .ref("Token")
      .orderByChild("ExpoToken")
      .equalTo(this.state.token)
      .once("value")
      .then(snapshot => {
        let tokenInfo = snapshot.val();
        for (var attributes in tokenInfo) {
          db_token.push(tokenInfo[attributes].ExpoToken);
        }
        if (db_token == token) {
          console.log("Token Already Persisted");
        } else {
          Firebase.database()
            .ref("Token")
            .push({
              ExpoToken: token
            });
        }
      });
  };

  render() {
    let swipeBtns = [
      {
        marginTop: "10%",
        marginLeft: "20%",
        text: "Delete",
        backgroundColor: "red",
        underlayColor: "rgba(0, 0, 0, 1, 0.6)",
        onPress: () => {
          this.deleteNotification();
        }
      }
    ];

    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#a13388", "#10356c"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%"
          }}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        >
          {this.state.delete === "Delete" ? (
            <View>
              <Text style={styles.paragraphNotify}>Latest Notification </Text>
              
              <Swipeout right={swipeBtns} left={swipeBtns}>
                <Text style={styles.paragraph}>
                  {JSON.stringify(this.state.notification).replace( /[\[\]"]+/g,"")}{" "}
                </Text>
              </Swipeout>
              <TouchableHighlight
                style={[styles.buttonContainerDel, styles.delButton]}
                onPress={() => this.props.navigation.navigate("RcvNotification")}
              >
                <Text style={styles.delText}>View All Notifications</Text>
              </TouchableHighlight>
            </View>
          ) : null}
          <View style={styles.Home}>
            <View style={styles.fixToText}>
              <TouchableHighlight
                style={[styles.buttonContainer, styles.clickButton]}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text style={styles.clickText}>Login</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.buttonContainer, styles.clickButton]}
                onPress={() => this.props.navigation.navigate("KEC_Katihar")}
              >
                <Text style={styles.clickText}>KEC Katihar</Text>
              </TouchableHighlight>
            </View>
            <Separator />
            <View style={styles.fixToText}>
              <TouchableHighlight
                style={[styles.buttonContainer, styles.clickButton]}
                onPress={() => this.props.navigation.navigate("Developers")}
              >
                <Text style={styles.clickText}>Developers</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.buttonContainer, styles.clickButton]}
                onPress={() => this.props.navigation.navigate("Admin")}
              >
                <Text style={styles.clickText}>About</Text>
              </TouchableHighlight>
            </View>
            <Separator />
          </View>

          <Text style={styles.footer}>{"\u00A9"} 2020 KEC Katihar</Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  footer: {
    fontWeight: "900",
    fontSize: 22,
    color: "#7b68ee",
    textAlign: "center",
    marginTop: 40
  },
  Home: {
    justifyContent: "center",
    alignContent: "center",
    marginTop: "30%"
  },
  separator: {
    marginVertical: "3%",
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  paragraph: {
    margin: 1.5,
    fontSize: 14,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b"
  },
  welcomeUser: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 30,
    fontWeight: "600",
    color: "#09C5F7"
  },
  buttonContainer: {
    height: 75,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 150,
    borderRadius: 15,
    marginTop: 20,
    marginRight: 15,
    marginLeft: "5%"
  },
  clickButton: {
    backgroundColor: "#09C5F7"
  },
  clickText: {
    color: "white",
    fontSize: 20,
    fontWeight: "800"
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    width: 300,
    textAlign: "center",
    marginLeft: 15
  },
  buttonContainerDel: {
    height: 45,
    width:175,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft:"24%",
    borderRadius: 30,
    marginTop:'4%'
  },
  delButton: {
    backgroundColor: "#09C5F7",
    marginRight: "10%"
  },
  delText: {
    color: "white",
    fontSize: 14
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  card: {
    height: "25%",
    borderRadius: 50
  },
  paragraphNotify: {
    margin: 1.5,
    fontSize: 14,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "700",
    paddingLeft: 12,
    color: "red"
  },
  viewAllNotification: {
    margin: 1.5,
    fontSize: 14,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
    paddingLeft: 12,
    color: "blue"
  }
});
