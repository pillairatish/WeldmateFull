import React, { Component,useState} from 'react';
import {
  Button, StyleSheet, Text, View, ScrollView,
  TextInput, Keyboard, TouchableOpacity,Alert, Pressable
} from 'react-native';
import Background from './Background';
import {httpurl,darkGreen, green} from './Constants';
import { RootContext } from '../providers/RootProvider';

export default class Login extends React.Component {

  static contextType = RootContext;
  constructor(props) {
    super(props);
    //const [data, setData] = useState([]);
    this.props=props;
    this.state = { loginName:'9373308686', password: 'ratish'}
  }

  onLoginChangeHandled=(loginName)=>
  {
    this.setState({loginName:loginName})
  }

  onPasswordChangeHandled=(password)=>
  {
    this.setState({password:password})
  }

  validateUser=(props,loginName,password)=>
  {
    var j=  'http://weldmateapi.wiztechsolutions.co.in//api/Login/Get?name='+ loginName +'&password=' +password;
    var headers= {
      Accept: "application/json",
      "Content-Type": "application/json",
    }; 
    fetch(j,
      {
        method:"GET",
        headers,
      })
    .then((response) => 
    {
       return response;
      }
    )
    .then((json) => 
    {
          if(json.status==200)
          {
            var j = this.context.loginInfo;
            j.PhoneNumber=loginName;
            this.context.setLoginInfo(j);
            props.navigation.navigate("Items");
          }
  
    })
    .catch((error) => 
    {
      console.error(error);
      return false;
    })
  return true;
  }

  componentDidMount()
  {
  
  }

  handleCallback(obj)
  {

  }

  
  refresh(){
  
  }

  render() {
    return (
      <Background>
        <View style={{alignItems: 'center', width: 460}}>
          <Text
            style={{
              color: 'white',
              fontSize: 64,
              fontWeight: 'bold',
              marginVertical: 20,
            }}>
            Login
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              height: 700,
              width: 460,
              borderTopLeftRadius: 130,
              paddingTop: 100,
              alignItems: 'center',
            }}>
  
  <TextInput
        placeholder="Phone Number"
        // keyboardType={'email-address'}
        onChangeText={this.onLoginChangeHandled}
        style={{borderRadius: 100, color: darkGreen, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
        placeholderTextColor={darkGreen} value={this.state.loginName}></TextInput>
  
        <TextInput
        placeholder="Password" secureTextEntry={true}  onChangeText={this.onPasswordChangeHandled}
        style={{borderRadius: 100, color: darkGreen, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
        placeholderTextColor={darkGreen} value={this.state.password} ></TextInput>
  
            <View
              style={{alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 200}}>
              <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                Forgot Password ?
              </Text>
            </View>
            <TouchableOpacity
      onPress={()=>{
        this.validateUser(this.props,this.state.loginName,this.state.password);
      }}
        style={{
          backgroundColor: green,
          borderRadius: 100,
          alignItems: 'center',
          width: 350,
          paddingVertical: 5,
          marginVertical: 10
        }}>
        <Text style={{color: darkGreen, fontSize: 25, fontWeight: 'bold'}}>
          Login
        </Text>
      </TouchableOpacity>
  
  
            <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
              <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </Background>
    );
  }
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', backgroundColor: '#FFD1D5' },
  row1: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  head: { flexDirection: 'row', backgroundColor: 'lightgrey' },
  dataWrapper: { marginTop: -1 },
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#FFFFFF',
    marginLeft :8,
    marginRight :7,
    marginBottom :7
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  inputContainer: {
    paddingTop: 15,
    margin:10
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 15,
    paddingLeft: 20,
    paddingRight: 20,
    color: "black",
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  text: { textAlign: 'center' }
});