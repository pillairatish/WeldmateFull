import React, { Component,useState} from 'react';
import {
  Button, StyleSheet, Text, View, ScrollView,
  TextInput, Keyboard, TouchableOpacity,Alert, Pressable
} from 'react-native';

import { Table, TableWrapper, Row, Rows,Cell} from 'react-native-table-component';
import Btn from './logincontrols/Btn';
import { darkGreen, lightBrown } from './logincontrols/Constants';
export default class MySpaceDetails extends React.Component {
  constructor(props) {
    super(props);
    //const [data, setData] = useState([]);
    this.props=props;
    this.state = {}
  }



  componentDidMount()
  {
  }
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Text style={{color:'black', fontSize:20}}> My Space</Text>
              <ScrollView style={styles.dataWrapper}>
              <Btn
                  Press={() => this.props.navigation.navigate('MyProfileDetails')}
                  style={styles.saveButton}
                  textColor="white"
                  bgColor={lightBrown}
                  btnLabel="My Profile"
      
                >
                </Btn>
                <Btn
                  Press={() => this.props.navigation.navigate('MyOrderDetails')}
                  style={styles.saveButton}
                  textColor="white"
                  bgColor={lightBrown}
                  btnLabel="Orders"
                >
                </Btn>
              </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', backgroundColor: '#FFD1D5' },
  row1: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  head: { flexDirection: 'row', backgroundColor: 'lightgrey' },
  dataWrapper: { marginTop: 50 },
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