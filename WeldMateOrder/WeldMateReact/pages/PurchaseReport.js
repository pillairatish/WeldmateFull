import React, { Component,useState} from 'react';
import {
  Button, StyleSheet, Text, View, ScrollView,
  TextInput, Keyboard, TouchableOpacity,Alert
} from 'react-native';

import { Table, TableWrapper, Row, Rows,Cell} from 'react-native-table-component';
import moment from 'moment'
import CustomDatePicker from './controls/CustomDatePicker'

export default class PurchaseReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fromDate:new Date(),toDate: new Date(), data:[],tableHead:['Item Name','Type','Balance Quantity']}
    this.handleDateChange1 = this.handleDateChange1.bind(this);
    this.handleDateChange2 = this.handleDateChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.refresh=this.refresh.bind(this);
  }

  componentDidMount()
  {
    var date = new Date();
    fetch('http://weldmateapi.wiztechsolutions.co.in/api/ItemHistory/GetLastEntryDate?i=0&j=0')
    .then((response) => response.json())
    .then((json) => 
    {
    //date = new Date(json);
    this.setState({lastDate:new Date(json)});
    })
    .catch((error) => console.error(error))

    

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
 

     this.setState({data:[]})
     fetch('http://weldmateapi.wiztechsolutions.co.in/api/Purchase?fromdate='+ffulldate +'&todate='+tfulldate)
    .then((response) => response.json())
    .then((json) => this.setState({data:json}))
    .catch((error) => console.error(error))
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
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <Text style={styles.header}>Purchase Report</Text> */}
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
          <Table>
            {
              this.state.data.map((rowData1, index1)=>(
                
                <View style={styles.tablecontainer}> 
                  <Table>
                    <Text> Bill Number: {rowData1.BillNo} </Text>
                    <Text> Bill Date: {moment(rowData1.BillDate).format('DD-MM-YYYY')} </Text>
                    {
                    new Date(rowData1.CreatedDate)>this.state.lastDate?
                    <Button title="Edit" onPress={() => {
                                                this.props.navigation.navigate('Purchase',{rowData: rowData1, mode:'Edit' });
                                                }} />:<Text/>
                    }
                    {
                      rowData1.PurchaseInvoiceDetail.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.row}>
                        {
                            <Cell style={{width:'50%'}} key={index+"cell1"} data={rowData.Item.ItemName} textStyle={styles.text}/>
                        }
                        {
                            <Cell style={{width:'30%'}} key={index+"cell2"} data={this.getName(rowData.Item.TyreType)} textStyle={styles.text}/>
                        }
                        {
                            <Cell style={{width:'20%'}}key={index+"cell3"} data={rowData.Quantity} textStyle={styles.text}/>
                        }
                        </TableWrapper>
                      ))

                    }
                    </Table>
                </View>
             ))
            }
            </Table>
             </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  dataWrapper: { marginTop: -1, },
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#F5FCFF',
    marginLeft:10,
    marginRight:10
  },
  tablecontainer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#F5FCFF',
    paddingBottom: 10,
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
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