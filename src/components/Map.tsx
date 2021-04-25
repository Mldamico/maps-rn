import React, {useEffect} from 'react';
import {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens/LoadingScreen';
import {Fab} from './Fab';

interface MapProps {}

export const Map: React.FC<MapProps> = ({}) => {
  const {hasLocation, initialPosition, getCurrentLocation} = useLocation();
  const mapViewRef = useRef<MapView>();

  const centerPosition = async () => {
    const location = await getCurrentLocation();
    mapViewRef.current?.animateCamera({center: location});
  };
  if (!hasLocation) {
    return <LoadingScreen />;
  }
  return (
    <>
      <MapView
        style={{flex: 1}}
        ref={el => (mapViewRef.current = el!)}
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
      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{position: 'absolute', bottom: 10, right: 10}}
      />
    </>
  );
};

const styles = StyleSheet.create({});
