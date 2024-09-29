import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/logincontrols/Login';
import Items from './pages/Items copy1';
import ItemDetails from './pages/controls/ItemDetails';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginStack" component={LoginStack}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const LoginStack = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="Items" component={MyStack}/>
      </Stack.Navigator>
  )
}

const MyStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Items" options={({ navigation }) => ({
     headerLeft: ()=> undefined,  })} component={Items} />
     <Stack.Screen name="ItemDetails" component={ItemDetails} />
      </Stack.Navigator>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
