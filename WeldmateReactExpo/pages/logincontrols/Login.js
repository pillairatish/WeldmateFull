import React, {useContext, useState, useCallback, useEffect } from 'react';
import {StyleSheet, View, Text, TextInput, Touchable, TouchableOpacity} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {httpurl,darkGreen, green} from './Constants';
import { locale } from 'moment';
import { RootContext } from '../providers/RootProvider';

const Login = (props) => {

  const [loginName, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const {setLoginInfo, loginInfo} = useContext(RootContext)
const ValidateUser=(props,loginName,password)=>
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



  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Phone"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtn} onPress={()=>{
      ValidateUser(props,loginName,password);
      // var contextType = RootContext;
      //     useEffect(() => {
      //       setLoginInfo({PhoneNumber: loginName})
      //     }, [setLoginInfo]);
    }}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity> 
    </View> 
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#F5DEB3",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#D2B48C",
  },
});
export default Login;