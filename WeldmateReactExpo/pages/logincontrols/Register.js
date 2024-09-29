import React, { Component,useState  } from 'react';
import {View, Text, Touchable, TouchableOpacity,Alert, KeyboardAvoidingView, ScrollView} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field from './Fields';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.props=props;
    this.state={customerName:'',companyName:'',phoneNumber:'',GSTNumber:'', emailAddress:'',password:'',confirmpassword:''};
  }
 
  handlecustomerNameChange=(customerName)=>
  {
    this.setState({customerName:customerName});
  }

  handleCompanyNameChange=(companyName)=>
  {
    this.setState({companyName:companyName});
  }

  handlePhoneNumberChange=(phoneNumber)=>
  {
    this.setState({phoneNumber:phoneNumber});
  }

  handleGstNumberChange=(GSTNumber)=>
  {
    this.setState({GSTNumber:GSTNumber});
  }

  handleEmailAddressChange=(emailAddress)=>
  {
    this.setState({emailAddress:emailAddress});
  }

  handlePasswordChange=(password)=>
  {
    this.setState({password:password});
  }
  
  handleConfirmPasswordChange=(confirmpassword)=>
  {
    this.setState({confirmpassword:confirmpassword});
  }

  validate()
  {
   if(!(this.state.password===this.state.confirmpassword))
   {
      Alert.alert("Confirm Password", "Your password is mismatch");     
      return false;
   }
   return true;
  }

  registerAccount()
  {
    if(this.validate())
    {
    var datastate=this.state;
    var body=JSON.stringify({
      customerName: datastate.customerName,
      companyName: datastate.companyName,
      phoneNumber: datastate.phoneNumber,
      GSTNumber : datastate.GSTNumber,
      emailAddress : datastate.emailAddress ,
      password : datastate.password
    });
    fetch('http://weldmateapi.wiztechsolutions.co.in/api/Login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerName: datastate.customerName,
        companyName: datastate.companyName,
        phoneNumber: datastate.phoneNumber,
        GSTNumber : datastate.GSTNumber,
        emailAddress : datastate.emailAddress ,
        password : datastate.password
      })
    });
    Alert.alert("Registration", "Account Registered.");
    this.props.navigation.navigate('Login');
  }
  }

  render()
  {
      return (
    <Background>
      <View style={{alignItems: 'center', width: 460}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Register
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Create a new account
        </Text>
        <KeyboardAvoidingView
      behavior="position">
        {/* <ScrollView
        bounces={false}
        contentContainerStyle={paddingVertical=20}
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={true}
        //style={commonStyles.scroll}
      > */}
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Field placeholder="Name" onChangeText={this.handlecustomerNameChange}/>
          <Field placeholder="Company Name" onChangeText={this.handleCompanyNameChange} />
          <Field
            placeholder="Email Address"
            keyboardType={'email-address'}
            onChangeText={this.handleEmailAddressChange}
          />
          <Field placeholder="Contact Number" keyboardType={'number'} onChangeText={this.handlePhoneNumberChange} />
          <Field placeholder="GST Number" onChangeText={this.handleGstNumberChange}/>
          <Field placeholder="Password" secureTextEntry={true}  onChangeText={this.handlePasswordChange}/>
          <Field placeholder="Confirm Password" secureTextEntry={true} onChangeText={this.handleConfirmPasswordChange}/>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '78%',
              paddingRight: 16
            }}>
          </View>

          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={() => {
              this.registerAccount();
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text
                style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </ScrollView> */}
        </KeyboardAvoidingView>
      </View>
    </Background>
  );
}
}
// const Register = props => {
//   return (
//     <Background>
//       <View style={{alignItems: 'center', width: 460}}>
//         <Text
//           style={{
//             color: 'white',
//             fontSize: 64,
//             fontWeight: 'bold',
//             marginTop: 20,
//           }}>
//           Register
//         </Text>
//         <Text
//           style={{
//             color: 'white',
//             fontSize: 19,
//             fontWeight: 'bold',
//             marginBottom: 20,
//           }}>
//           Create a new account
//         </Text>
//         <View
//           style={{
//             backgroundColor: 'white',
//             height: 700,
//             width: 460,
//             borderTopLeftRadius: 130,
//             paddingTop: 50,
//             alignItems: 'center',
//           }}>
//           <Field placeholder="First Name" />
//           <Field placeholder="Last Name" />
//           <Field
//             placeholder="Email / Username"
//             keyboardType={'email-address'}
//           />
//           <Field placeholder="Contact Number" keyboardType={'number'} />
//           <Field placeholder="Password" secureTextEntry={true} />
//           <Field placeholder="Confirm Password" secureTextEntry={true} />
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               width: '78%',
//               paddingRight: 16
//             }}>
//           </View>

//           <Btn
//             textColor="white"
//             bgColor={darkGreen}
//             btnLabel="Signup"
//             Press={() => {
//               alert('Account created');
//               props.navigation.navigate('Login');
//             }}
//           />
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               justifyContent: 'center',
//             }}>
//             <Text style={{fontSize: 16, fontWeight: 'bold'}}>
//               Already have an account ?{' '}
//             </Text>
//             <TouchableOpacity
//               onPress={() => props.navigation.navigate('Login')}>
//               <Text
//                 style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
//                 Login
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Background>
//   );
// };

// export default Register;