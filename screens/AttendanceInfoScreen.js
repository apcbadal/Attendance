import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import DatePicker from "react-native-datepicker";
import Firebase from '../components/config'





class AttendanceInfoScreen extends Component {
  state = { department: "", semester: "", subject: "", startDate:"",endDate:"" };
  updateDepartment = department => {
    this.setState({ department: department });
  };
  updateSemester = semester => {
    this.setState({ semester: semester });
  };
  updateSubject = subject => {
    this.setState({ subject: subject });
  };
  constructor(props) {
    super(props);

    this.state = { startDate: "", endDate: "" };
  }
  attendanceInfo=()=>{
    const department = this.state.department
    const sem = this.state.semester 
    const subject = this.state.subject
    

    var db_department = "";
    var db_semester = "";
    var db_date = "";
    var db_subject = "";

    Firebase.database().ref("attendance").orderByChild("date").startAt(this.state.startDate).endAt(this.state.endDate).once("value").then(snapshot =>{
        const attendanceInfo = snapshot.val();
        const dateSelected = [];
        const attendanceList = [];
        for(var attributes in attendanceInfo){
            var dateDb = attendanceInfo[attributes].date
            dateSelected.push(dateDb);
          }

        var dateList = [];
        for(var date in dateSelected){ 
            for(var attributes in attendanceInfo){
              db_department = attendanceInfo[attributes].department
              db_semester = attendanceInfo[attributes].semester
              db_date = attendanceInfo[attributes].date
              db_subject = attendanceInfo[attributes].subject
              if(db_department === department) {
                    if(db_semester === sem){
                      if(db_date === dateSelected[date]){
                        if(db_subject ===  subject){
                    
                    
                    var attendance = attendanceInfo[attributes].attendanceList
                    attendanceList.push(attendance)
                    var dateIn = attendanceInfo[attributes].date
                    dateList.push(dateIn);
                  }
                }
                }
                  
              }
              
            }
          }
        
    
    this.props.navigation.navigate("FacultyReport", {
      department: this.state.department,
      semester: this.state.semester,
      subject: this.state.subject,
      dateList,
      attendanceList
    })
})
  }

  

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.fixSize}>
      <DatePicker
      format="YYYY-MM-DD"
                date={this.state.startDate}
                onDateChange={(startDate) => {this.setState({startDate: startDate})}}
        />
      </View>
      <View style={styles.fixSize}>
      <DatePicker
      format="YYYY-MM-DD"   
                date={this.state.endDate}
                onDateChange={(endDate) => {this.setState({endDate: endDate})}}
        />
      </View>
        <View>
          <Picker
            selectedValue={this.state.department}
            onValueChange={this.updateDepartment}
          >
            <Picker.Item label="Select Department" value="Department" />
            <Picker.Item label="Civil Engineering" value="Civil Engineering" />
            <Picker.Item
              label="Mechanical Engineering"
              value="Mechanical Engineering"
            />
            <Picker.Item
              label="Computer Sc. & Engg."
              value="Computer Sc. & Engg."
            />
          </Picker>
          <Text style={styles.text}>{this.state.department}</Text>
        </View>
        <View>
          <Picker
            selectedValue={this.state.semester}
            onValueChange={this.updateSemester}
          >
            <Picker.Item label="Select Semester" value="Select Semester" />
            <Picker.Item label="1st" value="1st" />
            <Picker.Item label="2nd" value="2nd" />
            <Picker.Item label="3rd" value="3rd" />
            <Picker.Item label="4th" value="4th" />
            <Picker.Item label="5th" value="5th" />
            <Picker.Item label="6th" value="6th" />
            <Picker.Item label="7th" value="7th" />
            <Picker.Item label="8th" value="8th" />
          </Picker>
          <Text style={styles.text}>{this.state.semester}</Text>
        </View>

        <View>
          <Picker
            selectedValue={this.state.subject}
            onValueChange={this.updateSubject}
          >
            <Picker.Item label="Select Subject" value="Select Subject" />
            <Picker.Item label="Operating System" value="Operating System" />
            <Picker.Item label="Java" value="JAVA" />
            <Picker.Item label="DBMS" value="DBMS" />
          </Picker>
          <Text style={styles.text}>{this.state.subject}</Text>
        </View>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.clickButton]}
          onPress={() =>this.attendanceInfo()}
            
        >
          <Text style={styles.clickText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
export default AttendanceInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
    color: "#87ceeb",
    fontWeight: "800"
  },
  headText: {
    fontWeight: "900",
    color: "#008b8b",
    fontSize: 18,
    marginTop: 8,
    marginLeft: '5%',
    marginBottom: '5%'
  },
  fixSize: {
    justifyContent: "center",
    flexDirection: "row"
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
    marginRight: 15,
    marginLeft: 40
  },
  clickButton: {
    backgroundColor: "#00b5ec"
  },
  clickText: {
    color: "white",
    fontWeight: "800"
  }
});