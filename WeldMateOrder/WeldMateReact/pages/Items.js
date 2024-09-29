import React, { Component,useState} from 'react';
import {
  Button, StyleSheet, Text, View, ScrollView,
  TextInput, Keyboard, TouchableOpacity,Alert, Pressable
} from 'react-native';

import { Table, TableWrapper, Row, Rows,Cell} from 'react-native-table-component';
import { SegmentedControls } from 'react-native-radio-buttons'
import Item from './controls/Item';
import ShoppingCart from './controls/ShoppingCart';
import { RootContext } from './providers/RootProvider';
import {httpurl,darkGreen, green} from './logincontrols/Constants';
import MyOrders from './controls/MyOrders';
import Icon from 'react-native-ico-material-design';

export default class Items extends React.Component {
  static contextType = RootContext;
  static httpurl = httpurl;
  constructor(props) {
    super(props);
    //const [data, setData] = useState([]);
    this.props=props;
    this.state = { selectedOption:'CV',name: '',trucks:[[]], cars:[[]],twoWheeler:[[]],oht:[[]],data:[], filteredList:[]}
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleCallback=this.handleCallback.bind(this);
    this.setData=this.setData.bind(this);
    this.refresh=this.refresh.bind(this);
    this.setCategory=this.setCategory.bind(this);
    this.setStyles= this.setStyles.bind(this);
    this.setSelectedOption=this.setSelectedOption.bind(this);
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
    this.refresh()
  }

  setData(data) {
    this.setState({data:data });
    this.setState({filteredList:data });
    this.handleCallback([2]);
  }

  handleChange(trucks,cars,twoWheeler,oht) {
    this.setState({ trucks });
    this.setState({ cars });
    this.setState({ twoWheeler });
    this.setState({ oht });
  }

  handleNameChange(name) {

    this.setState({name:name})
    let data=this.state.data;
    if(name.length>0)
    {
      var filteredList = data.filter(item =>  item.ItemName.includes(name));
      this.setState({filteredList:filteredList});
    }
    else
    {
     // var filteredList = data;
     this.setSelectedOption(this.state.selectedOption);
    }

  }

  handleSubmit() {
    alert(this.state.trucks);
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

  dayEnd()
  {

    Alert.alert("Day End", "Do you want to Day End.", [
			{text: 'Cancel', onPress: () => {}, style: 'cancel' },
			{text: 'Day End.', onPress: () => {
          fetch('http://weldmateapi.wiztechsolutions.co.in/api/ItemHistory', {
  						method: 'POST',
  						headers: {
    					Accept: 'application/json',
    					'Content-Type': 'application/json'
  						},
  						body: JSON.stringify([{EntryType:1}])
					});
          Alert.alert("Day End", "Day End Done!");     
        }

      }
    ]);
  }

  
  refresh(){
    var url=httpurl;
    fetch('http://weldmateapi.wiztechsolutions.co.in/api'+'/Item')
    .then((response) => response.json())
    .then((json) => this.setData(json))
    .catch((error) => console.error(error))
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

      this.handleCallback(arr);

      
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
        <View style={styles.NavContainer}>
          <View style={styles.NavBar}>
              {/* <Button onPress={this.refresh} title="Refresh" color="#841584" /> */}
              <ShoppingCart cartCount={this.context.cart}/>
              <MyOrders />
              {/* <MyOrdersHome/> */}
            </View>
            </View>
            <View style={{height: "90%"}} >
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Search"
                placeholderTextColor="grey"
                maxLength={20}
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
                      onPress={() => this.props.navigation.navigate('ItemDetails', { item:rowData})}>
                        <Item key={rowData.ItemId} item={rowData}></Item>
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