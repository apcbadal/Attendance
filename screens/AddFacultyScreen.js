import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Picker,
  Image,
  TouchableHighlight,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from 'expo-constants';
import Firebase from "../components/config";

export default class AddFacultyScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      name: "",
      gender:"",
      department: "",
      errorMessage: null,
      image: null,
      CL:"",
      DL:"",
      SCL:"",
      compL:"",
      mobile: "",
      
    };
  }
  
  writeFacultyData(gender,SCL) {
    if(gender== "Female"){
      this.setState({
        SCL : SCL,
      })
    }
    else{
      this.setState({
        SCL: "0",
      })
    }
      Firebase.database()
        .ref("Faculty/")
        .orderByChild("email")
        .equalTo(this.state.email)
        .once("value")
        .then(res=>{
          res.forEach(record=>{
            Firebase.database()
            .ref("Faculty/"+record.key)
            .set({
              name: this.state.name,
              department: this.state.department,
              image: this.state.image,
              mobile: this.state.mobile,
              email: this.state.email,
              CL: this.state.CL,
              DL: this.state.DL,
              compL: this.state.compL,
              SCL: this.state.SCL,
            })
            .catch(function(error) {
              console.log("Wrong Choice");
              console.log(error);
            });
            this.props.navigation.navigate('Admin')          })
        })
    
      
    
  }
  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/name.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Name"
              keyboardType="default"
              underlineColorAndroid="transparent"
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            />
          </View>
          <View style={styles.inputContainer}>
            
            
            <Picker
          selectedValue={this.state.gender}
          style={{ height: 50, width: 180, marginLeft:"5%"}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ gender: itemValue })
          }
        >
          <Picker.Item label="Gender" value="gender" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          
        </Picker>  
        </View>    
          
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/department.jpg")}
            />
            
            <Picker
          selectedValue={this.state.department}
          style={{ height: 50, width: 180, marginLeft:"5%"}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ department: itemValue })
          }
        >
          <Picker.Item label="Department" value="department" />
          <Picker.Item label="Civil Engineering" value="Civil Engineering" />
          <Picker.Item label="Mechanical Engineering" value="Mechanical Engineering" />
          <Picker.Item label="Computer Sc. & Engineering" value="Computer Sc. & Engineering" />
          <Picker.Item label="Electrical & Electronics Engineering" value="Electrical & Electronics Engineering" />
          <Picker.Item label="Applied Sc. & Humanity" value="Applied Sc. & Humanity" />
        </Picker>  
        </View>       
        <View style={styles.inputContainer}>
            
            <TextInput
              style={styles.inputs}
              placeholder="Casual Leave"
              
              underlineColorAndroid="transparent"
              onChangeText={CL => this.setState({ CL })}
              value={this.state.CL}
            />
          </View>
          <View style={styles.inputContainer}>
            
            <TextInput
              style={styles.inputs}
              placeholder="Duty Leave"
              
              underlineColorAndroid="transparent"
              onChangeText={DL => this.setState({ DL })}
              value={this.state.DL}
            />
          </View>
          <View style={styles.inputContainer}>
            
            <TextInput
              style={styles.inputs}
              placeholder="Special Casual Leave"
              
              underlineColorAndroid="transparent"
              
              onChangeText={SCL => this.setState({SCL})}
              value={this.state.SCL}
            />
          </View>
          <View style={styles.inputContainer}>
            
            <TextInput
              style={styles.inputs}
              placeholder="Compensative Leave"
              
              underlineColorAndroid="transparent"
              onChangeText={compL => this.setState({ compL })}
              value={this.state.compL}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../assets/mailIcon.jpg")}
            />
            <TextInput
            caretHidden
              style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={require("../images/mobile.png")}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Mobile"
              underlineColorAndroid="transparent"
              onChangeText={mobile => this.setState({ mobile })}
              value={this.state.mobile}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TouchableHighlight
              style={[
                styles.imageChooseButtonContainer,
                styles.imageChooseclickButton
              ]}
              onPress={this._pickImage}
            >
              <Text style={styles.clickText}>Choose Photo</Text>
            </TouchableHighlight>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: 100,
                  height: 100,
                  marginLeft: 50,
                  borderRadius: 100 / 2
                }}
              />
            )}
          </View>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.clickButton]}
            onPress={() => this.writeFacultyData(this.state.gender,this.state.SCL)}
          >
            <Text style={styles.clickText}>Add Faculty</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
  componentDidMount() {
    this.getPermissionAsync();
    console.log("hi");
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: '25%',
    marginLeft: 45,
    paddingBottom: 20
  },
  inputContainer: {
    borderBottomColor: "#fff8dc",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 35,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 15
  },
  clickButton: {
    backgroundColor: "#00b5ec"
  },
  imageChooseButtonContainer: {
    height: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 100,
    borderRadius: 10,
    marginRight: 15,
    marginTop: 20
  },
  imageChooseclickButton: {
    backgroundColor: "#a0522d"
  },
  clickText: {
    color: "white",
    fontWeight: "800"
  },
  studentDetail: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 30,
    fontWeight: "600",
    color: "#d2691e"
  }
});
