import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {PermissionsContext} from '../context/PermissionsContext';
import {HomeScreen} from '../screens/HomeScreen';
import {LoadingScreen} from '../screens/LoadingScreen';
import {PermissionsScreen} from '../screens/PermissionsScreen';
const Stack = createStackNavigator();

export function StackNavigation() {
  const {permissions} = useContext(PermissionsContext);
  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }
  return (
    <Stack.Navigator
      initialRouteName="PermissionsScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      {permissions.locationStatus === 'granted' ? (
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      ) : (
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      )}
    </Stack.Navigator>
  );
}
