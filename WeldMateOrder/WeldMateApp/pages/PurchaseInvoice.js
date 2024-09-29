import React, { Component,useState  } from 'react';
import {
  Button, Modal,Pressable,StyleSheet, Text, View, ScrollView,
  TextInput, Keyboard, TouchableOpacity, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Table, TableWrapper, Row, Rows,Cell} from 'react-native-table-component';

import CustomDatePicker from './controls/CustomDatePicker';
import CustomModal from './controls/CustomModal';
import moment from 'moment'
export default class PurchaseInvoice extends React.Component {
  setPurchaseData(json)
  {
    json.forEach(function (element) {
      element.OrderQty = 0;
    });   
    this.setState({purchaseData:json});
  }

  constructor(props) {
    super(props);
  
    this.state = {purchaseData:[],billNo:'',billdate:new Date(),name: '',item:'',qty:0,mode:'New' }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCallback = this.handleCallback.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setPurchaseData =this.setPurchaseData.bind(this);
    this.focus1 =this.focus1.bind(this);
    this.getDate=this.getDate.bind(this);
    this.alertIndex =this.alertIndex.bind(this);
    this.minuselement =this.minuselement.bind(this);

  }

  alertIndex=(data,index)=>{
    let items = [...this.state.purchaseData];
    items.splice(index, 1);
    this.setState({purchaseData:items});
  }
  
  minuselement = (data, index) => (
    <TouchableOpacity onPress={() => this.alertIndex(index)}>
      <View style={styles.btn1}>
        <Text style={styles.btnText}>-</Text>
      </View>
    </TouchableOpacity>
  );

  getDate(date)
  {

    return moment(date.substring(0,10), "YYYY-MM-DD")
  }

  focus1()
  {
    var params=this.props.route.params;
    this.setState({mode:params.mode});
    if(params.mode=='Edit')
    {
      var j=this.props.route.params.rowData.PurchaseInvoiceDetail;
      var purchaseData=[];
      j.forEach(function (item, index) {
        var obj =
        {
          
          ItemId: item.Item.ItemId,
          ItemName:item.Item.ItemName,
          TyreType:item.Item.TyreType,
          OrderQty: item.Quantity,
        }
        purchaseData.push(obj);
      })
      this.setState({Id:params.rowData.Id});
      this.setState({purchaseData:purchaseData});
      this.setState({name:params.rowData.BillNo})
      this.setState({billdate:this.getDate(params.rowData.BillDate)})
    }
    
  }
  componentDidMount()
  {
    this.onFocusSubscribe = this.props.navigation.addListener('focus', this.focus1);
  }

  componentWillUnmount()
  {
    console.log('');

  }
  
  handleNameChange(name) {
    this.setState({ name });
  }

  handleItemChange(item) {
    this.setState({ item });
  }
  handleQtyChange(qty) {
    this.setState({ qty });
  }

  handleCallback(obj) {
    this.setState({purchaseData:obj});
    //saveSettings(this.state);
  }

  refresh()
  {
    this.setState({purchaseData:[],billNo:'',billdate:this.state.billdate,name: '',item:'',qty:0 });
  }


  handleSubmit(obj) {
    if(!this.state.name ||this.state.name=='' )
    {
      Alert.alert("Purchase Invoice", "Bill No. not entered!");
      return;
    }
    
    if(this.state.purchaseData.length==0)
    {
      Alert.alert("Purchase Invoice", "Items not selected!");
      return;
    }
    
    
    var data=[];
    this.state.purchaseData.forEach(function (item, index) {
      var obj =
      {
        item: {
            itemId: item.ItemId
        },
        quantity: item.OrderQty
      }
      data.push(obj);
    });

    if(this.state.mode=='New')
    {
      fetch('http://weldmateapi.wiztechsolutions.co.in/api/Purchase', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        billNo: this.state.name,
        billDate: this.state.billdate,
        billAmount: 0,
        vendor: "Apollo",
        purchaseInvoiceDetail: data
      })
    });
  }
  else if(this.state.mode=='Edit')
  {
    var str =JSON.stringify({
      Id:this.state.Id,
      billNo: this.state.name,
      billDate: this.state.billdate,
      billAmount: 0,
      vendor: "Apollo",
      purchaseInvoiceDetail: data
    });
    fetch('http://weldmateapi.wiztechsolutions.co.in/api/Purchase/', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Id:this.state.Id,
        billNo: this.state.name,
        billDate: this.state.billdate,
        billAmount: 0,
        vendor: "Apollo",
        purchaseInvoiceDetail: data
      })
    });

  }
    Alert.alert("Purchase Invoice", "Data Saved!");
    this.refresh();
}



  getName=(type)=>
    {
          if(type==1)
            return "Car"
          
          if(type==2)
            return "CV"
  
            if(type==3)
            return "TwoWheeler"
  
          if(type==4)
            return "OHT"
          
          if(type==5)
            return "Dura Tread"
  
    }
  render() {
   // const [modalVisible, setModalVisible] = useState(false);
    return (
      <View style={styles.container}>
        <View>
          <ScrollView>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>Bill Number</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Bill Number"
                placeholderTextColor="grey"
                maxLength={20}
                onBlur={Keyboard.dismiss}
                value={this.state.name}
                onChangeText={this.handleNameChange}
              />
              <Text style={styles.text}>Bill Date</Text>
              <CustomDatePicker defaultDate={this.state.billdate} textStyle={{
                  paddingVertical:15,
                  paddingHorizontal:10,
                  borderColor:'gray',
                  borderWidth:1
              }}
              onDateChange={(value)=>this.setState({billdate:value})}
              />
              <Text style={styles.text}>Item</Text>
              <CustomModal orderData={this.state.purchaseData} parentCallback = {this.handleCallback}/> 
              <View style={styles.container}>
                <Table borderStyle={{borderWidth: 1}}>
                  <Row data={this.state.tableHead} flexArr={[5, 3, 2]} style={styles.head} textStyle={styles.text}/>
                </Table>
                <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    {
                    this.state.purchaseData.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.row}>
                        {
                            <Cell style={{width:'40%'}} key={index+"cell1"} data={rowData.ItemName} textStyle={styles.text}/>
                        }
                        {
                            <Cell style={{width:'30%'}} key={index+"cell2"} data={this.getName(rowData.TyreType)} textStyle={styles.text}/>
                        }
                        {
                            <Cell style={{width:'20%'}}key={index+"cell3"} data={rowData.OrderQty} textStyle={styles.text}/>
                        }
                        {
                            <Cell style={{width:'10%'}}key={index+"cell4"} data={this.minuselement(rowData.OrderQty, index)} textStyle={styles.text}/>
                          
                        }
                        </TableWrapper>
                      ))
                    }
                    </Table>
                </ScrollView>
              </View>
              <View style={styles.inputContainer}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={this.handleSubmit}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn1: {  justifyContent: 'center',alignContent:'center', width: 35, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
  dataWrapper: { marginTop: -1 },
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 15,
    textAlign: 'left',
    margin: 10,
  },
    inputContainer: {
    paddingTop: 15,
    marginLeft:15,
    marginRight:15
  },
  textInput: {
    color:'black',
    height: 50,
    fontSize: 15,
    paddingVertical:15,
    paddingHorizontal:10,
    borderColor:'gray',
    borderWidth:1
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
  }
});