import React, { Component,useState,useContext} from 'react';
import {
  Button, Image, StyleSheet, Text, View, ScrollView,
  TextInput, Keyboard, TouchableOpacity,Alert
} from 'react-native';

import { Table, TableWrapper, Row, Rows,Cell} from 'react-native-table-component';
import { SegmentedControls } from 'react-native-radio-buttons'
import { RootContext } from '../providers/RootProvider';

export default class Item extends React.Component {
  static contextType = RootContext;
  constructor(props) {
    super(props);
    //const [data, setData] = useState([]);
    this.state = { item:props.route.params.item}
    this.setData=this.setData.bind(this);
    this.setCategory=this.setCategory.bind(this);
    this.setStyles= this.setStyles.bind(this);
    this.setSelectedOption=this.setSelectedOption.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart()
  {

  }
  setStyles(index)
  {
    if(index==-1)
        return styles.head;
    if(index%2==0)
      return styles.row;
    else
      return styles.row1;
  }

  setCategory(obj)
  {
    if(obj)
    {
      return obj.CategoryName;
    }
    else
    {
      return "";
    }

  }
  componentDidMount()
  {
    const value = this.context;
  }

  setData(data) {
    this.setState({data:data });
    this.setState({filteredList:data });
  }

  getName=(type)=>
    {
          if(type==1)
            return "Car"
          
          if(type==2)
            return "CV"
  
            if(type==3)
            return "2W"
  
          if(type==4)
            return "OHT"

          if(type==5)
            return "Dura"
  
    }

    setSelectedOption(selectedOption){

      this.setState({
        selectedOption
      });

      var arr=[];
      if(selectedOption=="Car")
        arr.push(1);
      
      if(selectedOption=="CV")
        arr.push(2);

      if(selectedOption=="2W/3W")
        arr.push(3);

      if(selectedOption=="OHT")
        arr.push(4);
      
      if(selectedOption=="Dura")
        arr.push(5);
    
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
    // const {cart, setCart,loginInfo, setLoginInfo}=useContext(RootContext);
    return (
      <View style={styles.container}>
          <Image
         style={{width: 300, height: 300}}
         resizeMode={'cover'}
        source={{
          uri: this.state.item.ItemHref,
        }}
      />
      <Text>{this.state.item.ItemName}</Text>
      <Text>{this.state.item.Description}</Text>
      <Text>Brand {this.state.item.Brand}</Text>
      <Text>Category {this.state.item.Category}</Text>
      <Text>Price : {this.state.item.Price}</Text>
      <Text>Available Quantity {this.state.item.OpeningBalance}</Text>
      <View style={styles.buttonView}>
        <View style={styles.buttonContainer}>
          <Button title="Add to Cart" onPress={
            ()=>{
              var j = this.context.cart;
              var item=this.state.item;
              item.BalanceQty="1"
              j.push(item);
              this.context.setCart(j);
            }
            }/>
        </View>
        <View style={styles.buttonContainer}>
          <Button disabled={true} title="Order Now"/>
        </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    margin:10,
  }, 
  row: { flexDirection: 'row', backgroundColor: '#FFD1D5' },
  row1: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  head: { flexDirection: 'row', backgroundColor: 'lightgrey' },
  dataWrapper: { marginTop: -1 },
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: 'lightgrey',
    marginLeft :8,
    marginRight :7,
    marginBottom :7,
    alignItems:'center'
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