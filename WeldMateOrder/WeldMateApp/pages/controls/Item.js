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
import { ImageCarousel } from './ImageCarousel';

class Item extends React.Component {
  static contextType = RootContext;
  constructor(props) {
    super(props);
    //const [data, setData] = useState([]);
    this.props=props;
    this.state = { item:props.item}
    this.setData=this.setData.bind(this);
    this.setCategory=this.setCategory.bind(this);
    this.setStyles= this.setStyles.bind(this);
    this.setSelectedOption=this.setSelectedOption.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.addToCartIsEnabled= this.addToCartIsEnabled.bind(this);
    this.setStyle= this.setStyle.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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

  setStyle(disabled)
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
    var imageRef=this.state.item.ItemHref;
    var images = imageRef.split(';');
    this.setState({imageHref:images[0]});
    this.setState({quantity:"1"})
  }

  componentWillMount() {
}

componentWillUnmount() {
}

handleBackButtonClick() {
  return true;
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
    handleQuantityChange=(quantity)=>
    {
      this.setState({quantity:quantity});
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
    const thead=['ItemName','Type','Qty','Price']
    //const [isDisabled, setIsDisabled] = useState(false);
    const options = [
      "CV",
      "Car",
      "2W/3W",
      "OHT",
      "Dura"
    ];
    var source1='../assets/add-to-cart.png';
    if(this.addToCartIsEnabled)
    {
      source1 ='../assets/add-to-cart.png';
    }
    // const {cart, setCart,loginInfo, setLoginInfo}=useContext(RootContext);
    return (
      <View style={styles.container}>
          {/* <Image
         style={{width: 300, height: 300}}
         resizeMode={'cover'}
        source={{
          uri: this.state.item.ItemHref,
        }}
      /> */}
      <ImageCarousel imageUrl={this.state.item.ItemHref.split(';')[0]}></ImageCarousel>
      <Text style={{ color:'black'}}>{this.state.item.ItemName}</Text>
      <Text style={{ color:'black'}}>Rs. {this.state.item.Price.toFixed(2)}</Text>
      {/*<View style={styles.buttonView}>
         <View style={styles.buttonContainer}>
            <Pressable disabled={this.state.addToCartDisabled} style={{alignItems:'center'}} onPress={() => {
              var j = this.context.cart;
              let result = j.map(a => a.ItemId);
              var item=this.state.item;
              item.Quantity=this.state.quantity;
              if(!result.includes(item.ItemId))
              {  
                j.push(item);
                this.context.setCart(j);
              }
              this.addToCartIsEnabled();
              }}>
              <Image source={require('../assets/add-to-cart.png')}
              style={this.setStyle(this.state.addToCartDisabled)}
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
      </View>*/}
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

export default Item