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

export default class CartDetails extends React.Component {
  static contextType = RootContext;
  constructor(props) {
    super(props);
    //const [data, setData] = useState([]);
    this.props=props;
    this.state = { }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount()
  {
  }

  handleSubmit(obj) {
    var loginInfo = this.context.loginInfo;
    var data=[];
    this.state.items.forEach(function (item, index) {
      var obj =
      {
        item: {
            itemId: item.ItemId
        },
        quantity: item.Quantity
      }
      data.push(obj);
    });

    var j =JSON.stringify({
      customer: loginInfo.PhoneNumber,
      orderEntryDetail: data
    });

      fetch('http://weldmateapi.wiztechsolutions.co.in/api/Sales', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer: loginInfo.PhoneNumber,
        orderEntryDetail: data
      })
    });
    
    Alert.alert("Order", "Order Placed!");
    this.context.setCart([]);
    this.setState({items:[]});
    //this.refresh();
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
    this.state.items = this.context.cart;
    //this.setState({items: this.context.cart })
    return (
      <View style={styles.container}>
        <Text style={{fontSize:20}}> My Cart</Text>
              <ScrollView style={styles.dataWrapper}>
                    <Table>
                    {
                    this.state.items.map((rowData, index) => (
                        <View style={{borderColor:"lightgrey" ,borderWidth:1 ,margin:10, flexDirection:'row'}}>
                        <View>
                        <ItemRow key={index} item={rowData}></ItemRow>
                        <TextInput style={{marginLeft:10, borderColor:'grey', borderWidth:1, height:40, width:100}}
       
                        onChangeText={(text) => {
                        this.setState({text}); 
                        //onChange(text);
                        } 
                        }
                        defaultValue={rowData.Quantity}
                      />
                        </View>
                        <View>
                          <Button title='Remove from Cart'></Button>
                        </View>
                        </View>
                        
                      ))
                    }
              </Table>
            </ScrollView>
            <View style={styles.inputContainer}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={this.handleSubmit}
                >
                  <Text style={styles.saveButtonText}>Order Now</Text>
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