import React, {useEffect} from 'react';

import Geolocation from '@react-native-community/geolocation';
import {useState} from 'react';
import {Location} from '../interfaces/appInterfaces';
export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    getCurrentLocation().then(location => {
      setInitialPosition(location);
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

  return {getCurrentLocation, hasLocation, initialPosition};
};
