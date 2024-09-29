import React, { Component,useState} from 'react';
import {
  Button, StyleSheet, Text, View, ScrollView,
  TextInput, Keyboard, TouchableOpacity,Alert
} from 'react-native';

import { Table, TableWrapper, Row, Rows,Cell} from 'react-native-table-component';

import CustomDatePicker from './controls/CustomDatePicker';

import { SegmentedControls } from 'react-native-radio-buttons'
import moment from 'moment';

export default class DailyItemReport extends React.Component {
  constructor(props) {
    super(props);
    //const [data, setData] = useState([]);
    this.state = {fromDate:new Date(),toDate: new Date(), selectedOption:'Tyre',name: '',trucks:[[]], cars:[[]],twoWheeler:[[]],oht:[[]],data:[], filteredList:[],purchaseCount:0,salesCount:0}
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
  }

  setData(data) {

     data.PurchaseItem.forEach((entry) => {
        var sum=0;
        entry.Value.forEach((entry1)=>{
            sum=sum+entry1.Value;
        }
        )
        entry.DateTotal=sum;
    });

    data.SalesItem.forEach((entry) => {
      var sum=0;
      entry.Value.forEach((entry1)=>{
          sum=sum+entry1.Value;
      }
      )
      entry.DateTotal=sum;
  });
    this.setState({data:data });
    this.setState({purchaseCount:data.PurchaseCount})
    this.setState({salesCount:data.SalesCount})
    this.setState({filteredList:data });
  }

  handleDateChange1(value) {
    this.setState({fromDate:value});
  }

  handleDateChange2(value) {
    this.setState({toDate:value});
  }

  handleSubmit(value) {
   this.refresh()
  }

  refresh(){
    var type=1;

    if(this.state.selectedOption=="Tyre")
      type=0;

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

    fetch('http://weldmateapi.wiztechsolutions.co.in/api/ItemReport/GetByDate?fromDate='+ffulldate +'&todate='+tfulldate+'&tyreType='+type)
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

    }

  render() {
    const options = [
      "Tyre",
      "Tread"
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
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={this.handleSubmit}
                >
                  <Text style={styles.saveButtonText}>Show</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{borderWidth: 1}}>
                    <TableWrapper style={styles.itemrow}>
                      <Cell style={{width:'88%'}} data="Purchase" />
                      <Cell style={{width:'12%', textAlign:"center"}} data={this.state.purchaseCount} />
                    </TableWrapper>
                    </Table>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    {
                    this.state.filteredList.PurchaseItem &&
                    this.state.filteredList.PurchaseItem.map((rowData, index) => (
                      <>
                      <TableWrapper key={index} style={styles.itemrow1}>
                            <Cell style={{width:'12%'}} key={index+"cell0"} data="" />
                            <Cell style={{width:'24%'}} key={index+"cell1"} data={moment(rowData.Key).format('DD-MM-YYYY')} />
                            <Cell style={{width:'38%'}} key={index+"cell3"} data={rowData.DateTotal} />
                        </TableWrapper>
                        {
                          this.state.filteredList.PurchaseItem[index].Value.map((rowData1,index1)=>(
                            <>
                            <TableWrapper key={index&index1} style={this.setStyles(index1)}>
                              <Cell style={{width:'24%'}} key={index1+index+"cell0"} data="" />
                              <Cell style={{width:'64%'}} key={index1+index+"cell1"} data={rowData1.Key.ItemName} />
                              <Cell style={{width:'12%'}} key={index1+index+"cell2"} data={rowData1.Value} />
                            </TableWrapper>
                            </>
                          ))
                        }
                        </>
                      ))
                    }
                    </Table>
                    <Table borderStyle={{borderWidth: 1}}>
                    <TableWrapper style={styles.itemrow}>
                      <Cell style={{width:'88%'}} data="Sales" />
                      <Cell style={{width:'12%', textAlign:"center"}} data={this.state.salesCount} />
                    </TableWrapper>
                    </Table>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    {
                    this.state.filteredList.SalesItem &&
                    this.state.filteredList.SalesItem.map((rowData, index) => (
                      <>
                      <TableWrapper key={index} style={styles.itemrow1}>
                            <Cell style={{width:'12%'}} key={index+"cell0"} data="" />
                            <Cell style={{width:'24%'}} key={index+"cell1"} data={moment(rowData.Key).format('DD-MM-YYYY')} />
                            <Cell style={{width:'38%'}} key={index+"cell3"} data={rowData.DateTotal} />
                      </TableWrapper>
                        {
                          this.state.filteredList.SalesItem[index].Value.map((rowData1,index1)=>(
                            <>
                            <TableWrapper key={index&index1} style={this.setStyles(index1)}>
                              <Cell style={{width:'24%'}} key={index1+index+"cell0"} data="" />
                              <Cell style={{width:'64%'}} key={index1+index+"cell1"} data={rowData1.Key.ItemName} />
                              <Cell style={{width:'12%'}} key={index1+index+"cell2"} data={rowData1.Value} />
                            </TableWrapper>
                            </>
                          ))
                        }
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
  itemrow1: { flexDirection: 'row', backgroundColor: '#CBCE91FF',},
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