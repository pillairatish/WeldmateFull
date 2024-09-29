import React, {Component,useContext} from 'react';
import { StyleSheet, Text, View, Image, Pressable} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootContext } from '../providers/RootProvider';
import { useNavigation } from '@react-navigation/native';

export default function ShoppingCart() {
    const navigation = useNavigation();
    const  cart  = useContext(RootContext);
  
    return (
      <View style={styles.container}>
       <Pressable onPress={() => navigation.navigate('CartDetails')}>
       <Image
          source={require('../assets/cart-148964_1280.png')}
          style={styles.tinyLogo}
        //   style={[styles.imageCircleStyle,{ transform: [{ scale: this.state.imageSize }]}]}
        />
        {/* <RootContext.Consumer>
                {cart=> <Text>{cart.length}</Text>}
        </RootContext.Consumer> */}
       </Pressable>
      </View>
    );
  }


const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tinyLogo: {
    width: 30,
    height: 30,
  },
  logo: {
    width: 66,
    height: 58,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0250a3',
    padding: 10
  },
  imageCircleStyle:{
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    borderWidth: 1,
    borderColor: '#0250a3',   
    marginBottom: 30
  },
  buttonStyle:{
    marginHorizontal: 15,
    borderRadius:5,
    borderWidth:1,
    borderColor: '#0250a3',
   
  }
});