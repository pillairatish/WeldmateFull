import React, { Component,useState  } from 'react';
import {View, Text, Touchable, TouchableOpacity,Alert, KeyboardAvoidingView, ScrollView} from 'react-native';
import Btn from './logincontrols/Btn';
import {darkGreen, lightBrown} from './logincontrols/Constants';
import Field from './logincontrols/Fields';
import { RootContext } from './providers/RootProvider';

export default class MyProfileDetails extends React.Component {
  static contextType = RootContext;
  constructor(props) {
    super(props);
    this.props=props;
    this.state={customerName:'',companyName:'',phoneNumber:'',GSTNumber:'', emailAddress:'', password:''};
    this.setValues=this.setValues.bind(this);
  }

  componentDidMount()
  {
    var phoneNumber= this.context.loginInfo.PhoneNumber;
    fetch('http://weldmateapi.wiztechsolutions.co.in/api'+'/Login?name='+phoneNumber)
    .then((response) => response.json())
    .then((json) => this.setValues(json))
    .catch((error) => console.error(error))
   
  }

  setValues(loginDetails)
  {
    this.setState({customerName:loginDetails.CustomerName});
    this.setState({companyName:loginDetails.CompanyName});
    this.setState({phoneNumber:loginDetails.PhoneNumber});
    this.setState({GSTNumber:loginDetails.GSTNumber});
    this.setState({emailAddress:loginDetails.EmailAddress});
    this.setState({password:loginDetails.Password});
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
  
  validate()
  {
   return true;
  }

  saveAccount()
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
    });
    
    fetch('http://weldmateapi.wiztechsolutions.co.in/api/Login/'+datastate.phoneNumber, {
      method: 'PUT',
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

    Alert.alert("User Profile", "Profile Saved.");
  }
  }

  render()
  {
      return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Field placeholder="Name" value={this.state.customerName} onChangeText={this.handlecustomerNameChange}/>
          <Field placeholder="Company Name" value={this.state.companyName} onChangeText={this.handleCompanyNameChange} />
          <Field
            placeholder="Email Address"
            value={this.state.emailAddress}
            keyboardType={'email-address'}
            onChangeText={this.handleEmailAddressChange}
          />
          {/* <Field placeholder="Contact Number" keyboardType={'number'} onChangeText={this.handlePhoneNumberChange} /> */}
          <Field placeholder="GST Number" value={this.state.GSTNumber} onChangeText={this.handleGstNumberChange}/>
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
            bgColor={lightBrown}
            btnLabel="Save"
            Press={() => {
              this.saveAccount();
            }}
          />
        </View>
        {/* </ScrollView> */}
        </KeyboardAvoidingView>
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