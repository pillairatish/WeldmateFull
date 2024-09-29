import React, {useContext, useState, useCallback, useEffect } from 'react';
import {View, Text, TextInput, Touchable, TouchableOpacity} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {httpurl,darkGreen, green} from './Constants';
import { locale } from 'moment';
import { RootContext } from '../providers/RootProvider';

const LoginCopy = (props) => {

  const [loginName, onLoginChangeHandled] = React.useState('');
  const [password, onPasswordChangeHandled] = React.useState('');
  const {setLoginInfo, loginInfo} = useContext(RootContext)
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
      onChangeText={onLoginChangeHandled}
      style={{borderRadius: 100, color: darkGreen, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
      placeholderTextColor={darkGreen} value={loginName}></TextInput>

      <TextInput
      placeholder="Password" secureTextEntry={true}  onChangeText={onPasswordChangeHandled}
      style={{borderRadius: 100, color: darkGreen, paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
      placeholderTextColor={darkGreen} value={password} ></TextInput>

          <View
            style={{alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 200}}>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Forgot Password ?
            </Text>
          </View>
          <TouchableOpacity
    onPress={()=>{
      ValidateUser(props,loginName,password);
      var contextType = RootContext;
          useEffect(() => {
            setLoginInfo({PhoneNumber: loginName})
          }, [setLoginInfo]);
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
        {Login}
      </Text>
    </TouchableOpacity>


          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </Background>
  );
};

export default Login;