import React, { Component,useState,useContext} from 'react';
import {
  Button, Image, StyleSheet, Text, View, ScrollView,
  TextInput, Keyboard, TouchableOpacity,Alert, Pressable
} from 'react-native';

import { RootContext } from '../providers/RootProvider';

class ItemRow extends React.Component {
  static contextType = RootContext;
  constructor(props) {
    super(props);
    //const [data, setData] = useState([]);
    this.props=props;
    this.state = { text:'',  item:props.item}
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
    
  }

  setData(data) {
    this.setState({data:data });
    this.setState({filteredList:data });
  }

  
  render() {
    const state = this.state;
    
    // const {cart, setCart,loginInfo, setLoginInfo}=useContext(RootContext);
    return (
      <View style={{flex:1 , flexDirection:"row", margin:10 }}>
        <Image
         style={{width: 100, height: 100}}
         resizeMode={'cover'}
        source={{
          uri: this.state.item.ItemHref.split(';')[0],
        }}
      />
      <View style={{margin:10}}>
        <Text style={{color: 'black'}}>{this.state.item.ItemName}</Text>
        <Text style={{color: 'black'}}>Rs. {this.state.item.Price.toFixed(2)}</Text>
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
  childcontainer: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: 'lightgrey',
    marginLeft :8,
    marginRight :7,
    marginBottom :7,
    alignItems:'left'
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

export default ItemRow