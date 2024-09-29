import { isMoment } from 'moment'
import React, { useState,Component} from 'react'
import {Modal,StyleSheet,Text,TouchableHighlight,View,Platform} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
//https://www.youtube.com/watch?v=lpIEpggB6o4
const CustomDatePicker =(props)=>{
  const {textStyle,defaultDate} =props;
  const [date,setDate]=useState(moment(defaultDate));
  const[show,setShow]=useState(false);

  const onChange=(e,selectedDate)=>
  {
    setShow(false);
    setDate(moment(selectedDate));
    props.onDateChange(selectedDate);
  }

  const onCancelPress=()=>{
    setShow(false);
    setDate(moment(defaultDate));

  }
  const onDonePress=()=>{
    props.onDateChange(date);
    setShow(false);
  }

  const renderDatePicker=()=>
  {  
      return(
            <DateTimePicker timeZoneOffsetInMinutes={0}
                        value={new Date(date)}
                        mode='date'
                        onChange={onChange}
                        ></DateTimePicker>
            )
  }


  return (
  <View>
      <TouchableHighlight activeOpacity={0} onPress={()=>setShow(true)}>
        <View>
          <Text style={textStyle}>{date.format('DD-MM-YYYY')}</Text>
          {Platform.OS === 'android' && show && renderDatePicker()}
          
          {/* <Modal
            transparent={true}
            animationType='slide'
            visible={show}
            onRequestClose={()=>setShow(false)}
          >
            <View style={{flex:1}}>
              <TouchableHighlight style={{
                flex:1,
                alignItems:'flex-end',
                flexDirection:'row'
              }}
              activeOpacity={1}
              visible={show}
              onPress={()=>setShow(false)}>
                <TouchableHighlight
                  underlayColor={'#FFFFFF'}
                  style={{
                    flex:1,
                    borderTopColor:'#E9E9E9',
                    borderTopWidth:1
                  }}
                  onPress={()=>console.log('datepicker clicked')}
                >
                  <View style={{
                      backgroundColor:"#FFFFFF",
                      height:256,
                     overflow:'hidden'
                  }}>
                      <View style={{marginTop:20}}>
                        <DateTimePicker timeZoneOffsetInMinutes={0}
                        value={new Date(date)}
                        mode='date'
                        onChange={onDateChange}
                        ></DateTimePicker>
                      </View>
                      <TouchableHighlight underlayColor={'transparent'}
                      style={[styles.buttonText,styles.buttonCancel]}>
                          <Text>Cancel</Text>
                      </TouchableHighlight>
                      <TouchableHighlight underlayColor={'transparent'}
                      style={[styles.buttonText,styles.buttonCancel]}>
                          <Text>Done</Text>
                      </TouchableHighlight>
                  </View>
                </TouchableHighlight>
              </TouchableHighlight>
            </View>
         </Modal> */}
        </View>
      </TouchableHighlight>
    </View>
  )
}

CustomDatePicker.defaultProps={
  textStyle:{},
  defaultDate:moment(),
  onDateChange:()=>{}
};

const styles = StyleSheet.create({
  buttonText:{
      position:'absolute',
      top:'0',
      height:'42',
      paddingHorizontal:20,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'


  }

})

export default CustomDatePicker;