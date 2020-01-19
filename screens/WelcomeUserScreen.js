import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Image,
  ScrollView
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-elements";
function Separator() {
  return <View style={styles.separator} />;
}
export default class LoginScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeUser}>
          Welcome to Online Attendance System
        </Text>
        <Card
          title="Md TALIB AHMAD"
          titleStyle={{
            color: "#3498db",
            textAlign: "left",
            paddingLeft: 10,
            fontSize: 15,

            fontWeight: "800"
          }}
        >
          <View style={styles.fixImage}>
            <View>
              <Text style={styles.paragraph}>Assistant Prof.</Text>
              <Text style={styles.paragraph}>Computer Sc. & Engg.</Text>
              <Text style={styles.paragraph}>+91 9108006551</Text>
              <Text style={styles.paragraph}>mdtalibahmad@gmail.com</Text>
            </View>
            <Image
              source={require("../assets/mta.jpg")}
              style={{
                width: 105,
                height: 105,
                marginLeft: 5,
                borderRadius: 100 / 2
              }}
            />
          </View>
        </Card>

        
        <View style={styles.fixToText}>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.props.navigation.navigate('Attendance')}
          >
            <Text style={styles.clickText}>Attendance</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.props.navigation.navigate('AddStudents')}
          >
            <Text style={styles.clickText}>Student</Text>
          </TouchableHighlight>
        </View>
        <Separator />
        <View style={styles.fixToText}>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.handleLogin()}
          >
            <Text style={styles.clickText}>Report</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.handleLogin()}
          >
            <Text style={styles.clickText}>Student Detail</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fixImage: {
    justifyContent: "space-around",
    flexDirection: "row"
  },
  paragraph: {
    margin: 1.5,
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 12,
    color: "#008b8b"
  },
  welcomeUser: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 30,
    fontWeight: "600",
    color: "#d2691e"
  },
  buttonContainer: {
    height: 65,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    marginRight: 15
  },
  clickButton: {
    backgroundColor: "#F9872E"
  },
  clickText: {
    color: "white",
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
  headText: {
    fontWeight: "900",
    color: "#f4a460",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 14
  },
  separator: {
    marginVertical: "3%",
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});