import React, { Component,useState} from 'react';
import {
  Button, StyleSheet, Text, View, ScrollView,
  TextInput, Keyboard, TouchableOpacity,Alert
} from 'react-native';

import { Table, TableWrapper, Row, Rows,Cell} from 'react-native-table-component';

import CustomDatePicker from './controls/CustomDatePicker';

import { SegmentedControls } from 'react-native-radio-buttons'
import moment from 'moment';

export default class ItemReport extends React.Component {
  constructor(props) {
    super(props);
    //const [data, setData] = useState([]);
    this.state = {fromDate:new Date(),toDate: new Date(), selectedOption:'CV',name: '',trucks:[[]], cars:[[]],twoWheeler:[[]],oht:[[]],data:[], filteredList:[],tableHead:['Item Name','OB','Pur.','Sale.','CB']}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setData=this.setData.bind(this);
    this.refresh=this.refresh.bind(this);
    this.setCategory=this.setCategory.bind(this);
    this.setStyles= this.setStyles.bind(this);
    this.setSelectedOption=this.setSelectedOption.bind(this);
  }

  setStyles(index)
  {
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

  handleDateChange1(value) {
    this.setState({fromDate:value});
  }

  handleSubmit(value) {
   this.refresh()
  }

  handleDateChange2(value) {
    this.setState({toDate:value});
  }

  handleCallback(obj)
  {
    let data=this.state.data;
    if(obj.length>0)
      var filteredList = data.filter(item =>  obj.includes(item.Item.TyreType));
    else
      var filteredList = data;

    this.setState({filteredList:filteredList});
  }

  refresh(){

    var fromdate =this.state.fromDate;
    var fmm = fromdate.getMonth() + 1; 
    var fdd = fromdate.getDate();
    var ffulldate =  [fromdate.getFullYear(),
      (fmm>9 ? '' : '0') + fmm,
      (fdd>9 ? '' : '0') + fdd
     ].join('');

     var todate =this.state.toDate;
     var tmm = todate.getMonth() + 1; 
     var tdd = todate.getDate();
     var tfulldate =  [todate.getFullYear(),
       (tmm>9 ? '' : '0') + tmm,
       (tdd>9 ? '' : '0') + tdd
      ].join('');

    fetch('http://weldmateapi.wiztechsolutions.co.in/api/ItemReport?fromDate='+ffulldate +'&todate='+tfulldate)
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
    const options = [
      "CV",
      "Car",
      "2W/3W",
      "OHT",
      "Dura"
    ];
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <Text style={styles.header}>Item Report</Text> */}
          
            {/* <SheetJS onChange={this.handleChange}/> */}
            <CustomDatePicker textStyle={{
                  paddingVertical:15,
                  paddingHorizontal:10,
                  borderColor:'gray',
                  borderWidth:1
              }}
              onDateChange={(value)=>this.handleDateChange1(value)}
              />

           <CustomDatePicker textStyle={{
                  paddingVertical:15,
                  paddingHorizontal:10,
                  borderColor:'gray',
                  borderWidth:1
              }}
              onDateChange={(value)=>this.handleDateChange2(value)}
              />
              <View style={styles.inputContainer}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={this.handleSubmit}
                >
                  <Text style={styles.saveButtonText}>Show</Text>
                </TouchableOpacity>
              </View>

            {/* <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Search"
                placeholderTextColor="grey"
                maxLength={20}
                onBlur={Keyboard.dismiss}
                value={this.state.name}
                onChangeText={this.handleNameChange}
              />
              </View> */}
              {/* <MultiSelectItem parentCallback = {this.handleCallback}></MultiSelectItem> */}
              <SegmentedControls
                tint={'darkgrey'}
                selectedTint= {'black'}
                backTint= {'#FFF1C1'}
                options={ options }
                allowFontScaling={ false } // default: true
                onSelection={ this.setSelectedOption.bind(this) }
                selectedOption={ this.state.selectedOption }
                optionStyle={{fontFamily: 'AvenirNext-Medium'}}
                optionContainerStyle={{flex: 1}}
              />  
              <View style={styles.container}>
                <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    {
                    this.state.filteredList.map((rowData, index) => (
                      <>
                      <Table borderStyle={{borderWidth: 1}}>
                        <Row data={this.state.tableHead} flexArr={[5.2, 1.2,1.2, 1.2,1.2]} style={styles.head} textStyle={styles.text}/>
                      </Table>
                        <TableWrapper key={index} style={styles.itemrow}>
                        {
                            <Cell style={{width:'52%'}} key={index+"cell1"} data={rowData.Item.ItemName} />
                        }
                        {
                            <Cell style={{width:'12%', textAlign:"center"}}key={index+"cell3"} data={rowData.OpeningBalance} textStyle={styles.text}/>
                        }
                        {
                            <Cell style={{width:'12%', textAlign:"center"}}key={index+"cell5"} data={rowData.PurchaseCount} textStyle={styles.text}/>
                        }
                        {
                            <Cell style={{width:'12%', textAlign:"center"}}key={index+"cell7"} data={rowData.SalesCount} textStyle={styles.text}/>
                        }
                        {
                            <Cell style={{width:'12%', textAlign:"center"}}key={index+"cell9"} data={rowData.ClosingBalance} textStyle={styles.text}/>
                        }
                        </TableWrapper>
                        <TableWrapper style={styles.purchaserow}>
                        {
                            <Cell style={{width:'10%'}} key={index+"cell02"} data="" />
                        }
                        {
                            <Cell style={{width:'45%'}} key={index+"cell2"} data="Purchases" />
                        }
                        {
                            <Cell style={{width:'45%',textAlign:"center" }} key={index+"cell4"} data={rowData.PurchaseCount} />
                        }                          
                        </TableWrapper>
                        {
                        rowData.PurchaseInvoice.map((rowData1, index1) => (
                          <TableWrapper style={this.setStyles(index1)}>
                          {
                            <Cell style={{width:'20%'}} key={index+"P"+index1+"cell01"} data="" />
                          }
                          {
                            <Cell style={{width:'27%'}} key={index+"P"+index1+"cell1"} data={rowData1.BillNo} />
                          }
                          {
                            <Cell style={{width:'27%', textAlign:"center"}}key={index+"P"+index1+"cell2"} data={moment(rowData1.BillDate).format('DD-MM-YYYY')} textStyle={styles.text}/>
                          }
                          {
                            <Cell style={{width:'27%', textAlign:"center"}}key={index+"P"+index1+"cell3"} data={rowData1.PurchaseInvoiceDetail[0].Quantity} textStyle={styles.text}/>
                          }
                          </TableWrapper >

                        ))
                        }
                       <TableWrapper style={styles.salesrow}>
                        {
                            <Cell style={{width:'10%'}} key={index+"cell02"} data="" />
                        }
                        {
                            <Cell style={{width:'45%'}} key={index+"cell2"} data="Sales" />
                        }
                        {
                            <Cell style={{width:'45%',textAlign:"center" }} key={index+"cell4"} data={rowData.SalesCount} />
                        }                          
                        </TableWrapper>
                        {
                        rowData.SalesInvoice.map((rowData1, index1) => (
                          <TableWrapper style={this.setStyles(index1)}>
                          {
                            <Cell style={{width:'20%'}} key={index+"S"+index1+"cell01"} data="" />
                          }
                          {
                            <Cell style={{width:'27%'}} key={index+"S"+index1+"cell1"} data={rowData1.BillNo} />
                          }
                          {
                            <Cell style={{width:'27%', textAlign:"center"}}key={index+"S"+index1+"cell2"} data={moment(rowData1.BillDate).format('DD-MM-YYYY')} textStyle={styles.text}/>
                          }
                          {
                            <Cell style={{width:'27%', textAlign:"center"}}key={index+"S"+index1+"cell3"} data={rowData1.SalesInvoiceDetail[0].Quantity} textStyle={styles.text}/>
                          }
                          </TableWrapper >
                        ))
                        }
                        <TableWrapper style={styles.white}>
                          {
                            <Cell style={{width:'20%'}} key={index+"S"+"cell01"} data="" />
                          }
                        </TableWrapper>
                        </>
                        
                      ))
                    }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  white: { flexDirection: 'row', backgroundColor: 'white',},
  itemrow: { flexDirection: 'row', backgroundColor: '#CBC3E3',},
  purchaserow: { flexDirection: 'row', backgroundColor: '#D3D3D3' },
  salesrow: { flexDirection: 'row', backgroundColor: '#D3D3D3' },
  row: { flexDirection: 'row', backgroundColor: '#FFD1D5' },
  row1: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
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