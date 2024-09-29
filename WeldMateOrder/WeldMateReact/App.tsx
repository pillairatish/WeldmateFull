/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Items from './pages/Items';
import PurchaseInvoice from './pages/PurchaseInvoice';
import SalesInvoice from './pages/SalesInvoice';
import PurchaseReport from './pages/PurchaseReport';
import SalesReport from './pages/SalesReport';
import DailyItemReport from './pages/DailyItemReport';
import ItemReport from './pages/ItemsReport';
import ItemDetails from './pages/controls/ItemDetails';
import Item from './pages/controls/Item';
import { RootProvider, RootContext } from './pages/providers/RootProvider';
import Login from './pages/logincontrols/Login';
import Register from './pages/logincontrols/Register';
import ShoppingCart from './pages/controls/ShoppingCart';
import CartDetails from './pages/CartDetails';
import MyOrders from './pages/controls/MyOrders';
import MyOrderDetails from './pages/MyOrderDetails';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function firstScreenStack() {
  return (
    <Stack.Navigator initialRouteName="Items"        
    screenOptions={{
    headerShown: false
    }}>
    <Stack.Screen
      name="Items"
      component={Items}
      options={{
        title: '', //Set Header Title
      }}
    />
  </Stack.Navigator>

  );
}


function secondScreenStack({route: {params}}) {
  return (
      <Stack.Navigator initialRouteName="Purchase"        
        screenOptions={{
        headerShown: false
        }}>
        <Stack.Screen
          name="Purchase"
          component={PurchaseInvoice}
          options={{
            title: '', //Set Header Title
          }}
          initialParams={params} 
          />
      </Stack.Navigator>
  );
}

function thirdScreenStack({route: {params}}) {
  return (
      <Stack.Navigator initialRouteName="Sales"        
        screenOptions={{
        headerShown: false
        }}>
        <Stack.Screen
          name="Sales"
          component={SalesInvoice}
          options={{
            title: '', //Set Header Title
          }}
          initialParams={params}
        />
      </Stack.Navigator>
  );
}

function fourthScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="PurchaseReport"        
        screenOptions={{
        headerShown: false
        }}>
        <Stack.Screen
          name="PurchaseReport"
          component={PurchaseReport}
          options={{
            title: '', //Set Header Title
          }}
        />
      </Stack.Navigator>
  );
}

function fifthScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="SalesReport"        
        screenOptions={{
        headerShown: false
        }}>
        <Stack.Screen
          name="SalesReport"
          component={SalesReport}
          options={{
            title: '',
          }}
        />
      </Stack.Navigator>
  );
}

function sixthScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="ItemReport"        
        screenOptions={{
        headerShown: false
        }}>
        <Stack.Screen
          name="ItemReport"
          component={ItemReport}
          options={{
            title: '',
          }}
        />
      </Stack.Navigator>
  );
}

function seventhScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="DailyItemReport"        
        screenOptions={{
        headerShown: false
        }}>
        <Stack.Screen
          name="DailyItemReport"
          component={DailyItemReport}
          options={{
            title: '',
          }}
        />
      </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{
      drawerPosition: 'left'
    }}>
      <Drawer.Screen name="Daily Item Stock " component={firstScreenStack} options={{unmountOnBlur:true}} />
      <Drawer.Screen name="Shopping Cart" component={thirdScreenStack} initialParams={{ rowData: {}, mode:'New' }} options={{unmountOnBlur:true}}/>
    </Drawer.Navigator>
  );
}



function App(): JSX.Element {
  
  return (
    <RootProvider>
    <NavigationContainer>
      {/* <MyDrawer/> */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Items" component={Items} />
        <Stack.Screen name="Item" component={Item} />
        <Stack.Screen name="ItemDetails" component={ItemDetails} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
        <Stack.Screen name="CartDetails" component={CartDetails} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="MyOrderDetails" component={MyOrderDetails} />
      </Stack.Navigator>
    </NavigationContainer>
    </RootProvider>
  );
}

export default App;
