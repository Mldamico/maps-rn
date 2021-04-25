import React, {useEffect, useRef} from 'react';

import Geolocation from '@react-native-community/geolocation';
import {useState} from 'react';
import {Location} from '../interfaces/appInterfaces';
export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const watchId = useRef<number>();

  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    getCurrentLocation().then(location => {
      setInitialPosition(location);
      setUserLocation(location);
      setHasLocation(true);
    });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
          setHasLocation(true);
        },
        e => {
          reject({e});
          setHasLocation(false);
        },
        {enableHighAccuracy: true},
      );
    });
  };

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({coords}) => {
        setUserLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      e => {},
      {enableHighAccuracy: true, distanceFilter: 10},
    );
  };

  const stopFollowUserLocation = () => {
    if (watchId.current) {
      Geolocation.clearWatch(watchId.current);
    }
  };

  return {
    userLocation,
    getCurrentLocation,
    hasLocation,
    initialPosition,
    followUserLocation,
    stopFollowUserLocation,
  };
};
