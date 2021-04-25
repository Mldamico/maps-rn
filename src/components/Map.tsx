import React, {useEffect, useState} from 'react';
import {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../screens/LoadingScreen';
import {Fab} from './Fab';

interface MapProps {}

export const Map: React.FC<MapProps> = ({}) => {
  const [showPolyline, setShowPolyline] = useState(true);
  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines,
  } = useLocation();
  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);
  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    if (!following.current) return;
    mapViewRef.current?.animateCamera({center: userLocation});
  }, [userLocation]);
  const centerPosition = async () => {
    following.current = true;
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
        }}
        onTouchStart={() => (following.current = false)}>
        {showPolyline && (
          <Polyline
            coordinates={routeLines}
            strokeColor="black"
            strokeWidth={3}
          />
        )}
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
      <Fab
        iconName="brush-outline"
        onPress={() => setShowPolyline(!showPolyline)}
        style={{position: 'absolute', bottom: 80, right: 10}}
      />
    </>
  );
};

const styles = StyleSheet.create({});
