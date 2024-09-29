import React, { Component,useState} from 'react';
import {
  Button, StyleSheet, Text, View, ScrollView,
  TextInput, Modal,Keyboard, TouchableOpacity,Alert, Image, Pressable, BackHandler
} from 'react-native';

import { Table, TableWrapper, Row, Rows,Cell} from 'react-native-table-component';
import { SegmentedControls } from 'react-native-radio-buttons'
import ItemRow from './controls/ItemRow';
import ShoppingCart from './controls/ShoppingCart';
import { RootContext } from './providers/RootProvider';
import {httpurl,darkGreen, green} from './logincontrols/Constants';
import Field from './logincontrols/Fields';

export default class OrderNow extends React.Component {
  static contextType = RootContext;
  constructor(props) {
    super(props);
    //const [data, setData] = useState([]);
    this.props=props;
    this.state = {item:props.route.params.items.item,quantity:props.route.params.items.quantity, totalQuantity:0,modalVisible:false, profileEntered:false }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }


  componentDidMount()
  {
    const value = this.context;
  }

  componentWillMount() {
}

componentWillUnmount() {
}

handleBackButtonClick(obj) {
  // if(this.props)
  //   this.props.navigation.goBack(null);
  // return true;
}
  removeFromCart(itemId)
  {
    var items = this.state.items;
    items = items.filter((item) => item.ItemId !== itemId);
    this.setState({items});
  }

  handlecustomerNameChange=(customerName)=>
  {
    this.setState({customerName:customerName});
  }
  
  handlePhoneNumberChange=(phoneNumber)=>
  {
    this.setState({phoneNumber:phoneNumber});
  }

  handleEmailAddressChange=(emailAddress)=>
  {
    this.setState({emailAddress:emailAddress});
  }

  handleContinue=()=>
  {
      if(this.state.phoneNumber==undefined || this.state.phoneNumber=="")
        return;

      var modalVisible=!this.state.modalVisible;
      this.setState({profileEntered:true})
      this.setState({modalVisible:modalVisible});
  }


  handleSubmit(obj) {
    var loginInfo = this.context.loginInfo;
    if(loginInfo.PhoneNumber=="" && this.state.profileEntered==false)
    {
      this.setState({modalVisible:true});
      return;
    }
    var data=[];
    var obj =
      {
        item: {
            itemId: this.state.item.ItemId
        },
        quantity: this.state.item.Quantity
      }
      data.push(obj);

      var phoneNumber= loginInfo.PhoneNumber;
      var emailAddress= loginInfo.EmailAddress;
      var customerName= loginInfo.CustomerName;
      if(loginInfo.PhoneNumber=="")
      {
        phoneNumber=this.state.phoneNumber;
        emailAddress=this.state.emailAddress;
        customerName=this.state.customerName;
      }

      fetch('http://weldmateapi.wiztechsolutions.co.in/api/Sales', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer: phoneNumber,
        emailAddress:emailAddress,
        comments:customerName,
        orderEntryDetail: data
      })
    }).then((response) => response.json())
    .then((json) => Alert.alert('Order placed','Order Number : ' + json))
    .catch((error) => console.error(error));;
    
}

render() {
    const state = this.state;
    const thead=['ItemName','Type','Qty','Price']
    const options = [
      "CV",
      "Car",
      "2W/3W",
      "OHT",
      "Dura"
    ];
    var rowData = this.state.item;
    rowData.Quantity=this.state.quantity;
    return (
      <View style={styles.container}>
        <Text style={{color:'black', fontSize:20}}> Order</Text>
              <ScrollView style={styles.dataWrapper}>
                    <Table>
                    {
                        <View style={{borderColor:"lightgrey" ,borderWidth:1 ,margin:10, flexDirection:'row'}}>
                        <View style={{marginBottom:10}}>
                        <ItemRow key={1} item={rowData}></ItemRow>
                        <View style={{flexDirection:'row'}}>
                        <TextInput style={{color: "black", marginLeft:10, borderColor:'grey', borderWidth:1, height:40, width:100}}
       
                        onChangeText={(text) => {
                          rowData.Quantity= text;
                        } 
                        }
                        defaultValue={rowData.Quantity}
                      />
                      <View style={{marginLeft:10, flexDirection:'row'}}>
                      <Pressable onPress={() => {
                          Alert.alert('Remove', 'Are you sure you want to Remove' + rowData.ItemName + 'from the Cart?', [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {text: 'OK', onPress: () => this.removeFromCart(rowData.ItemId)},
                          ]);

                        }}>
                        <Image
                          source={require('./assets/bin.png')}
                          style={styles.tinyLogo}
                        />
                        </Pressable>
                      </View>
                      </View>
                        </View>
                        </View>
                    }
              </Table>
            </ScrollView>
            <View style={styles.inputContainer}>
                {/* <TouchableOpacity
                  style={styles.saveButton}
                  onPress={this.handleSubmit}
                >
                  <Text style={styles.saveButtonText}>Order Now</Text>
                </TouchableOpacity> */}

<View style={styles.centeredView}>
  <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          var modalVisible=!this.state.modalVisible;
          this.setState({modalVisible:modalVisible});
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Field placeholder="Name" value={this.state.customerName} onChangeText={this.handlecustomerNameChange}/>
          <Field
            placeholder="Email Address"
            value={this.state.emailAddress}
            keyboardType={'email-address'}
            onChangeText={this.handleEmailAddressChange}
          />
          <Field placeholder="Contact Number" keyboardType={'number'} onChangeText={this.handlePhoneNumberChange} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.handleContinue()}>
              <Text style={styles.textStyle}>Continue..</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      </View>


                <TouchableOpacity
        onPress={this.handleSubmit}
        style={{
          backgroundColor: green,
          borderRadius: 100,
          alignItems: 'center',
          width: 350,
          paddingVertical: 5,
          marginVertical: 10,
        }} >
        <Text style={{color: darkGreen, fontSize: 25, fontWeight: 'bold'}}>
        Order Now
        </Text>
      </TouchableOpacity>
              </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', backgroundColor: '#FFD1D5' },
  row1: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  head: { flexDirection: 'row', backgroundColor: 'lightgrey' },
  dataWrapper: { marginTop: -1 },
  tinyLogo: {
    width: 30,
    height: 30,
  },
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
    margin:10,
    alignItems :'center'
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
  text: { textAlign: 'center' },
  centeredView: {
    // flex: 1,
     justifyContent: 'center',
    //alignItems: 'center',
    // width:460,
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

});