import { visible } from "ansi-colors";
import React, {Component, useState } from "react";
import { KeyboardAvoidingView,Alert, Modal, StyleSheet, Text, Pressable, View, Button, ScrollView,TextInput, Keyboard, TouchableOpacity} from "react-native";
import { Table, TableWrapper, Row, Rows,Cell} from 'react-native-table-component';
//import{ StaticFunctions} from './StaticFunctions';
export default class CustomModal extends React.Component
{
    setData(json)
    {
        json.forEach(function (element) {
        element.OrderQty = 0;
    });   
    this.setState({data:json});
    this.setState({searchdata:json});
    //let orderdata=this.props.orderData
    this.setState({orderdata:json});
    }

    constructor(props) {
        super(props);
        this.state = {itemsearch:'',orderdata:[],searchdata:[],data:[],modalVisible:false};
        this.getName=this.getName.bind(this);
        this.addelement=this.addelement.bind(this);
        this.minuselement=this.minuselement.bind(this);
        this.setModalVisible=this.setModalVisible.bind(this);
        this.alertIndex=this.alertIndex.bind(this);
        this.setData =this.setData.bind(this);
        this.handleItemChange=this.handleItemChange.bind(this);
        this.onRefresh =this.onRefresh.bind(this);
      }

      
    onRefresh()
    {
      fetch('http://weldmateapi.wiztechsolutions.co.in/api/Item')
            .then((response) => response.json())
            .then((json) => this.setData(json))
            .catch((error) => console.error(error))

    }

      setModalVisible=(visible)=>
      {
          if(visible)
          {
            let pData = this.props.orderData;
            //let searchdata=  this.state.data;
            let searchdata=  JSON.parse(JSON.stringify(this.state.data))
            pData.forEach(function (element) {
             let i= searchdata.findIndex(item => item.ItemName.includes(element.ItemName));
             searchdata[i].OrderQty=element.OrderQty;
            }); 
            searchdata.sort(function (x, y) {
              return y.OrderQty - x.OrderQty;
            });
            this.setState({searchdata:searchdata});
            this.setState({orderdata:searchdata});
          }
          this.setState({modalVisible:visible})
          this.setState({itemsearch:''})
          // this.setState(this.state.searchdata);
      }

      addelement = (data, index) => (
        <TouchableOpacity onPress={() => this.alertIndex(1,index)}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>+</Text>
          </View>
        </TouchableOpacity>
      );
    
      componentDidMount()
      {
            fetch('http://weldmateapi.wiztechsolutions.co.in/api/Item')
            .then((response) => response.json())
            .then((json) => this.setData(json))
            .catch((error) => console.error(error))
      }

      alertIndex=(data,index)=>{
            let OrderQty=this.state.searchdata[index].OrderQty+data;
            let items = [...this.state.searchdata];
            let item = {...items[index]};
            item.OrderQty = OrderQty;
            items[index] = item;
            
            let orderdata= [...this.state.orderdata];
            let i= orderdata.findIndex(item1 => item1.ItemName.includes(item.ItemName));
            orderdata[i]=item;

            this.setState({orderdata:orderdata});
            this.setState({searchdata:items});
         
      }

    onSave = (event) => {
      
        let obj = this.state.orderdata.filter((x)=>{return x.OrderQty>0});;
        this.props.parentCallback(obj);
        this.setModalVisible(!this.state.modalVisible)
    }

    handleItemChange = (event) => {
            this.setState({itemsearch:event});
            let searchdata=[];
            if(event==''){
              searchdata=[...this.state.data];
            }
            else
            {
              searchdata = this.state.data.filter(item => item.ItemName.toLowerCase().includes(event.toLowerCase()));
            }
            this.setState({searchdata:searchdata})
            
  }
    
      minuselement = (data, index) => (
        <TouchableOpacity onPress={() => this.alertIndex(-1,index)}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>-</Text>
          </View>
        </TouchableOpacity>
      );

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

    render()
    {
        return (
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <View style={styles.centeredView1}>
                  <View style={styles.modalView}>
                  <View style={styles.container}>
                  <KeyboardAvoidingView
                     behavior="position"
                     enabled
                    >
                        {/* <Table borderStyle={{borderWidth: 1}}> */}
                          {/* <Row data={this.state.tableHead} flexArr={[5, 3, 2]} style={styles.head} textStyle={styles.text}/> */}
                          <TextInput
                            style={{color: "black",}}
                            placeholder="Search"
                            placeholderTextColor="grey" 
                            onBlur={Keyboard.dismiss}
                            value={this.state.itemsearch}
                            onChangeText={this.handleItemChange}
                          />
                        {/* </Table> */}
                        </KeyboardAvoidingView>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                            { this.state.searchdata&&
                            this.state.searchdata.map((rowData, index) => (
                                <TableWrapper key={index} style={styles.row}>
                                {
                                    <Cell style={{width:'30%'}} key={index+"cell1"} data={rowData.ItemName} textStyle={styles.text}/>
                                }
                                {
                                    <Cell style={{width:'20%'}} key={index+"cell2"} data={this.getName(rowData.TyreType)} textStyle={styles.text}/>
                                }
                                {
                                    <Cell style={{width:'10%'}}key={index+"cell3"} data={rowData.BalanceQty} textStyle={styles.text}/>
                                }
                                {
                                    <Cell style={{width:'10%'}}key={index+"cell4"} data={rowData.OrderQty} textStyle={styles.text}/>
                                }
                                {
                                    <Cell style={{width:'15%'}}key={index+"cell5"} data={this.addelement(rowData.OrderQty, index)}/>
                                }
        
                                {
                                    <Cell style={{width:'15%'}} key={index+"cell6"} data={this.minuselement(rowData.OrderQty, index)}/>
                                }
                                </TableWrapper>
                              ))
                            }
                      </Table>
                    </ScrollView>
                      </View>
        
        
                      <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={this.onRefresh}
                    >
                      <Text style={styles.textStyle}>Refresh</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={this.onSave}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => this.setModalVisible(true)}
              >
                <Text style={styles.textStyle}>Items</Text>
              </Pressable>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: {  justifyContent: 'center',
            alignItems: 'center', 
            width: 28, 
            height: 18, 
            backgroundColor: '#78B7BB',  
            borderRadius: 2,
            marginRight:10,
            marginLeft:10
          },
  btnText: { 
      justifyContent: 'center',
      alignItems: 'center',  
      textAlign: 'center', 
      color: '#fff' ,
      fontSize:15
    },
  dataWrapper: { marginTop: -1 },
    container: {
        height:600,
        width:300
      },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  centeredView1: {
    left: 30,
    position: "absolute",
    right: 30,
    top: 50
  },

  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    padding: 5,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
