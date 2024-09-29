/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Items from './pages/Items';
import ItemDetails from './pages/controls/ItemDetails';
import Item from './pages/controls/Item';
import { RootProvider, RootContext } from './pages/providers/RootProvider';
import Login from './pages/logincontrols/Login';
import Register from './pages/logincontrols/Register';
import ShoppingCart from './pages/controls/ShoppingCart';
import CartDetails from './pages/CartDetails';
import MyOrders from './pages/controls/MyOrders';
import MyOrderDetails from './pages/MyOrderDetails';
import OrderNow from './pages/OrderNow';
import MySpace from './pages/controls/MySpace';
import MySpaceDetails from './pages/MySpaceDetails';
import MyProfileDetails from './pages/MyProfileDetails';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function App(): JSX.Element {
  
  return (
    <RootProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginStack}/>
        <Stack.Screen name="Items" component={MyStack}/>
      </Stack.Navigator>
    </NavigationContainer>
    </RootProvider>
  );
}

const LoginStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
  )
}

const MyStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Items" options={({ navigation }) => ({
     headerLeft: ()=> undefined,  })} component={Items} />
        <Stack.Screen name="Item" component={Item} />
        <Stack.Screen name="ItemDetails" component={ItemDetails} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
        <Stack.Screen name="CartDetails" component={CartDetails} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="MyOrderDetails" component={MyOrderDetails} />
        <Stack.Screen name="MySpaceDetails" options={({ navigation }) => ({
     headerLeft: ()=> undefined,  })} component={MySpaceDetails} />
     <Stack.Screen name="MyProfileDetails" options={({ navigation }) => ({
     headerLeft: ()=> undefined,  })} component={MyProfileDetails} />
        <Stack.Screen name="MySpace" component={MySpace} />
        <Stack.Screen name="OrderNow" component={OrderNow} />
      </Stack.Navigator>
  )
}

export default App;
