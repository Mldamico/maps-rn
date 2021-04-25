import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens/LoadingScreen';

interface MapProps {}

export const Map: React.FC<MapProps> = ({}) => {
  const {hasLocation, initialPosition} = useLocation();

  if (!hasLocation) {
    return <LoadingScreen />;
  }
  return (
    <MapView
      style={{flex: 1}}
      // provider={PROVIDER_GOOGLE}
      showsUserLocation
      initialRegion={{
        latitude: initialPosition.latitude,
        longitude: initialPosition.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {/* <Marker
        image={require('../assets/custom-marker.png')}
        coordinate={{latitude: 37.78825, longitude: -122.4324}}
        title="titulo"
        description="desc"
      /> */}
    </MapView>
  );
};

const styles = StyleSheet.create({});
