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
    Geolocation.getCurrentPosition(
      ({coords}) => {
        setInitialPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setHasLocation(true);
      },
      e => {
        console.log(e);
        setHasLocation(false);
      },
      {timeout: 20000, enableHighAccuracy: true},
    );
  }, []);
  return {hasLocation, initialPosition};
};
