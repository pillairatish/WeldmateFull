import React, { Component,useState,useContext} from 'react';
import {
  Button, Image, StyleSheet, Text, View, ScrollView,
  TextInput, Keyboard, TouchableOpacity,Alert,Pressable, BackHandler
} from 'react-native';

import { Table, TableWrapper, Row, Rows,Cell} from 'react-native-table-component';
import { SegmentedControls } from 'react-native-radio-buttons'
import { RootContext } from '../providers/RootProvider';
import {httpurl,darkGreen, green} from '../logincontrols/Constants';
import Field from '../logincontrols/Fields';
import { ImageCarousel } from './ImageCarousel';

export default class ItemDetails extends React.Component {
  static contextType = RootContext;
  constructor(props) {
    super(props);
    //const [data, setData] = useState([]);
    this.state = { item:props.route.params.item, quantity:props.route.params.quantity, imageEnabled:true}
    this.setData=this.setData.bind(this);
    this.setCategory=this.setCategory.bind(this);
    this.setStyles= this.setStyles.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.addToCartIsEnabled= this.addToCartIsEnabled.bind(this);
    this.setStyle= this.setStyle.bind(this);
  }

  addToCart()
  {

  }
  setStyle(disabled)
  {
    if(disabled)
      return styles.tinyLogoDisabled;
    else
      return styles.tinyLogo
  }

  addToCartIsEnabled()
    {
    //   var j = this.context.cart;
    //   let result = j.map(a => a.ItemId);
    //   var item = this.state.item;
    //   if(result.includes(item.ItemId))
    //   { 
    //     this.setState({addToCartDisabled:true});
    //   }
    //   else
    //   this.setState({addToCartDisabled:false});
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
    this.setState({quantity:"1"})
    // var j = this.context.cart;
    // let result = j.map(a => a.ItemId);
    // if(result.includes(this.state.item.ItemId))
    // {
    //   var it = j.filter(x=>x.ItemId==this.state.item.ItemId)[0];
    //   this.setState({quantity:it.Quantity})
    // }
    // this.addToCartIsEnabled();
  }

  
  componentWillMount() {
}

componentWillUnmount() {
}
handleBackButtonClick=()=> {
  return true;
}

  setData(data) {
    this.setState({data:data });
    this.setState({filteredList:data });
  }

  
    handleQuantityChange=(quantity)=>
    {
      this.setState({quantity:quantity});
    }

  render() {
    const state = this.state;
    // const {cart, setCart,loginInfo, setLoginInfo}=useContext(RootContext);
    return (
      <ScrollView contentContainerStyle={styles.container}>
      <ImageCarousel imageUrl={this.state.item.ItemHref}></ImageCarousel>
      <ScrollView>
      <Text style={{ color:'black'}}>{this.state.item.ItemName}</Text>
      <Text style={{ color:'black'}}>{this.state.item.Description}</Text>
      <Text style={{ color:'black'}}>Brand {this.state.item.Brand}</Text>
      <Text style={{ color:'black'}}>Category {this.state.item.Category}</Text>
      <Text style={{ color:'black'}}>Price : Rs. {this.state.item.Price.toFixed(2)}</Text>
      <Text style={{ color:'black'}}>Available Quantity {this.state.item.OpeningBalance}</Text>
      </ScrollView>
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
        style={{
          backgroundColor: green,
          alignItems: 'center',
          borderRadius: 10,
          alignItems: 'center',
          alignContent :'center',
          width: 120,
          height:50
        }}
        onPress={() => {
          this.props.navigation.navigate('OrderNow', { items:{item:this.state.item,quantity:this.state.quantity}})}} 
        >
        <Text style={{color: darkGreen, fontSize: 22, fontWeight: 'bold'}}>
        Order Now
        </Text>
      </TouchableOpacity>
        </View>
      {
        this.state.addToCartDisabled && 
          <View style={{backgroundColor: '#fffdd0', color:'orange' }}>
          <Text >Item added to the Cart</Text>
        </View>
      }
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:-100
  },
  buttonContainer: {
    flex: 1,
    margin:10,
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