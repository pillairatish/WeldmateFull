import React, { Component,useState,useContext} from 'react';
import {
  Button, Image, StyleSheet, Text, View, ScrollView,
  TextInput, Keyboard, TouchableOpacity,Alert, Pressable,BackHandler
} from 'react-native';

import { Table, TableWrapper, Row, Rows,Cell} from 'react-native-table-component';
import { SegmentedControls } from 'react-native-radio-buttons'
import { RootContext } from '../providers/RootProvider';
import {httpurl,darkGreen, green} from '../logincontrols/Constants';
import Field from '../logincontrols/Fields';
import Item from './Item';

export default class RowItem extends React.Component {
  static contextType = RootContext;
  constructor(props) {
    super(props);
    //const [data, setData] = useState([]);
    this.props=props;
    this.state = { item:props.item, imageEnabled:true}
    this.setCategory=this.setCategory.bind(this);
    this.setStyles= this.setStyles.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.addToCartIsEnabled= this.addToCartIsEnabled.bind(this);
    
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

  setStyle=(disabled)=>
  {
    if(disabled)
      return styles.tinyLogoDisabled;
    else
      return styles.tinyLogo
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
    this.setState({quantity:"1"})
    var j = this.context.cart;
    let result = j.map(a => a.ItemId);
    if(result.includes(this.state.item.ItemId))
    {
      var it = j.filter(x=>x.ItemId==this.state.item.ItemId)[0];
      this.setState({quantity:it.Quantity})
    }

    this.addToCartIsEnabled();
  }

  handleQuantityChange=(quantity)=>
    {
      this.setState({quantity:quantity});
    }
    
    addToCartIsEnabled()
    {
      var j = this.context.cart;
      let result = j.map(a => a.ItemId);
      var item = this.state.item;
      if(result.includes(item.ItemId))
      { 
        this.setState({addToCartDisabled:true});
      }
      else
      this.setState({addToCartDisabled:false});
    }

  render() {
    const state = this.state;
    var source1='../assets/add-to-cart.png';
    if(this.addToCartIsEnabled)
    {
      source1 ='../assets/add-to-cart.png';
    }
    // const {cart, setCart,loginInfo, setLoginInfo}=useContext(RootContext);
    return (
      <View style={styles.container1}>
        <View style={styles.container}>
        <Pressable
                      onPress={() => this.props.navigation.navigate('ItemDetails', { item:this.state.item, quantity:this.state.quantity})}>
              <Item navigation={this.props.navigation} key={this.state.item.ItemId} item={this.state.item}></Item>
        </Pressable>
        </View>
      <View style={styles.buttonView}>
        <View style={styles.buttonContainer}>
            <Pressable style={{alignItems:'center'}} onPress={() => {
              this.state.imageEnabled=false;
              var j = this.context.cart;
              let result = j.map(a => a.ItemId);
              var item=this.state.item;
              item.Quantity=this.state.quantity;
              if(result.includes(item.ItemId))
              {  
                j = j.filter(function(idx) {
                  return idx.ItemId !== item.ItemId
              })
              }
              j.push(item);
              this.context.setCart(j);
              this.addToCartIsEnabled();
              setTimeout(() => {this.setState({imageEnabled: true})}, 200)

              }}>
              <Image source={require('../assets/add-to-cart.png')}
              style={this.setStyle(!this.state.imageEnabled)}
              />
            </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Field placeholder="Qty" value={this.state.quantity} onChangeText={this.handleQuantityChange}/>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('OrderNow', { items:{item:this.state.item,quantity:this.state.quantity}})}} 
        style={{
          backgroundColor: green,
          alignItems: 'center',
          paddingVertical: 5,
          marginVertical: 10,
        }}>
        <Text style={{color: darkGreen, fontSize: 25, fontWeight: 'bold'}}>
        Order Now
        </Text>
      </TouchableOpacity>
        </View>
      </View>
      {
        this.state.addToCartDisabled && 
          <View style={{backgroundColor: '#fffdd0', color:'orange' }}>
          <Text >Item added to the Cart</Text>
        </View>
      }
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
  tinyLogoDisabled: {
    width: 30,
    height: 30,
    opacity: 0.3
  },
  tinyLogo: {
    width: 30,
    height: 30,
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
    alignItems:'center',
    width:"100%",
  },

  container1: {
    flex: 1,
    alignItems:'center',
    borderBottomColor: 'black',
    borderBottomWidth:2,
    width:"100%",
    marginTop :30

    
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
