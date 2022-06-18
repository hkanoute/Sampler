import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import { store } from "./store";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Pad from './components/Pad';
import Library from './components/Library';
import EditSample from './components/EditSample';
import TrimSample from './components/TrimSample';
import { ToastProvider } from 'react-native-toast-notifications'
import Api from './components/Api';
import Record from './components/Record';

const persistor = persistStore(store);
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();


const AppWrapper = () => {
  return (
    <ToastProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, size, color }) => {
                let iconName;
                if (route.name == "Pad") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name == "Edit Sample") {
                  iconName = focused ? "settings" : "settings-outline";
                } else if (route.name == "Trim Sample") {
                  iconName = focused ? "options" : "options-outline";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "grey",
            })}>
            <Stack.Screen name="Pad" component={App} />
            <Stack.Screen name="Edit Sample" component={EditSample} />
            <Stack.Screen name="Trim Sample" component={TrimSample} />
            <Stack.Screen name="Api" component={Api} />
            <Stack.Screen name="Library" component={Library} />
            <Stack.Screen name="Record" component={Record} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ToastProvider>

  )
}
const App = () => {
  return (
    <View style={styles.container}>
      <Pad />
    </View>
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

export default AppWrapper