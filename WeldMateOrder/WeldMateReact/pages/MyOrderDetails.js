import React, { Component,useState} from 'react';
import {
  Button, StyleSheet, Text, View, ScrollView,
  TextInput, Keyboard, TouchableOpacity,Alert, Pressable
} from 'react-native';

import { Table, TableWrapper, Row, Rows,Cell} from 'react-native-table-component';
import { SegmentedControls } from 'react-native-radio-buttons'
import ItemRow from './controls/ItemRow';
import ShoppingCart from './controls/ShoppingCart';
import { RootContext } from './providers/RootProvider';
import moment from 'moment'

export default class MyOrderDetails extends React.Component {
  static contextType = RootContext;
  constructor(props) {
    super(props);
    //const [data, setData] = useState([]);
    this.props=props;
    this.state = { orderDetails:[]}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonDisabled = this.buttonDisabled.bind(this);
  }



  componentDidMount()
  {
    var phoneNumber= this.context.loginInfo.PhoneNumber;
    fetch('http://weldmateapi.wiztechsolutions.co.in/api'+'/Sales?customernumber='+ phoneNumber)
    .then((response) => response.json())
    .then((json) => this.setState({orderDetails:json}))
    .catch((error) => console.error(error))
   
    this.state.orders=[];
  }

  handleSubmit(obj) {
    
}

buttonDisabled(orderStatus)
{
  if(orderStatus==0)
    return false;
  
  return true;
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

    return (
      <View style={styles.container}>
        <Text style={{fontSize:20}}> My Orders</Text>
              <ScrollView style={styles.dataWrapper}>
                    <Table>
                    {
                    this.state.orderDetails.map((rowData, index) => (
                        <View style={{borderColor:"lightgrey" ,borderWidth:1 ,margin:10, flexDirection:'row'}}>
                          <Text> Bill : {rowData.BillNo} </Text>
                          <Text> dated: {moment(rowData.BillDate).format('DD-MM-YYYY')} </Text>
                        <View>

                        </View>
                        <View>
                          <Button disabled={this.buttonDisabled(rowData.OrderStatus)} title='Cancel'></Button>
                        </View>
                        </View>
                        
                      ))
                    }
              </Table>
            </ScrollView>
      </View>
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