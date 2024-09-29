import React, { Component,useState} from 'react';
import {
  Button, StyleSheet, Text, View, ScrollView,
  TextInput, Keyboard, TouchableOpacity,Alert, Pressable, BackHandler
} from 'react-native';

import { Table, TableWrapper, Row, Rows,Cell} from 'react-native-table-component';
import ShoppingCart from './controls/ShoppingCart';
import { RootContext } from './providers/RootProvider';
import {httpurl,darkGreen, green} from './logincontrols/Constants';
import MySpace from './controls/MySpace';
import RowItem from './controls/RowItem';

export default class Items extends React.Component {
  static contextType = RootContext;
  static httpurl = httpurl;
  
  constructor(props) {
    super(props);
    //const [data, setData] = useState([]);
    this.props=props;
    this.state = { showProfile:false,name: '',data:[], filteredList:[]}
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCallback=this.handleCallback.bind(this);
    this.setData=this.setData.bind(this);
    this.refresh=this.refresh.bind(this);
    this.setCategory=this.setCategory.bind(this);
    this.setStyles= this.setStyles.bind(this);
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
    var j =this.context;
    this.setState({showProfile:j.loginInfo.IsLoggedIn})
    this.refresh();
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


  handleNameChange(name) {

    this.setState({name:name})
    let data=this.state.data;
    if(name.length>0)
    {
      var filteredList = data.filter(item =>  item.ItemName.toLowerCase().includes(name.toLowerCase()));
      this.setState({filteredList:filteredList});
    }
    else
    {
     var filteredList = data;
     this.setState({filteredList:filteredList});
    }

  }

  handleCallback(obj)
  {
    let data=this.state.data;
    // if(obj.length>0)
    // {
    //   var filteredList = data.filter(item =>  obj.includes(item.TyreType));
    //   if(obj[0]==2||obj[0]==4)
    //   {
    //     filteredList.sort(function (a, b) {
    //       return b.SinglePrice - a.SinglePrice;
    //     });
    //   }
    //   else{
    //     filteredList.sort(function (a, b) {
    //       return a.SinglePrice - b.SinglePrice;
    //     });

    //   }

    // }
    // else
      var filteredList = data;

    this.setState({filteredList:filteredList});
  }

  refresh(){
    var url=httpurl;
    fetch('http://weldmateapi.wiztechsolutions.co.in/api'+'/Item')
    .then((response) => response.json())
    .then((json) => this.setData(json))
    .catch((error) => console.error(error))
  }


    
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.NavContainer}>
            <View style={styles.NavBar}>
              {/* <Button onPress={this.refresh} title="Refresh" color="#841584" /> */}
              <ShoppingCart cartCount={this.context.cart}/>
              {/* <MyOrders /> */}
              {
                this.state.showProfile && <MySpace />
              }
              {/* <MyOrdersHome/> */}
            </View>
        </View>
            <View style={{height: "90%"}} >
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Search"
                placeholderTextColor="grey"
                onBlur={Keyboard.dismiss}
                value={this.state.name}
                onChangeText={this.handleNameChange}
              />
              </View> 
              <ScrollView >
              <View style={styles.container}>
              <ScrollView style={styles.dataWrapper}>
                    <Table>
                    {
                    this.state.filteredList.map((rowData, index) => (
                      <Pressable
                      >
                        {/* <Item navigation={this.props.navigation} key={rowData.ItemId} item={rowData}></Item> */}
                        <RowItem navigation={this.props.navigation} key={rowData.ItemId} item={rowData}></RowItem>
                        </Pressable>
                      ))
                    }
              </Table>
              </ScrollView>
              </View>
        </ScrollView>
        </View>
        {/* <View style={styles.NavContainer}>
          <View style={styles.NavBar}>
              <Pressable style={styles.IconBehaviour}
              android_ripple={{borderless:true,radius:50}}
              >
              <Icon name="add-label-button" background={{ type: "button", color: 'green' }} />
              </Pressable>
          </View>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  NavContainer:{
    position:'absolute',
    alignItems:'center',
    verticalAlign:'top',
    bottom:20,
  },

  NavBar:{
    flexDirection:'row',
    width:'90%',
    justifyContent:'space-evenly',
    borderRadius:40,
    verticalAlign:'top',
  },

  IconBehaviour:{
    padding:14
  },

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