import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Map} from '../components/Map';
export const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Map />
    </View>
  );
};

const styles = StyleSheet.create({});
