import React, {useEffect, useRef} from 'react';

import Geolocation from '@react-native-community/geolocation';
import {useState} from 'react';
import {Location} from '../interfaces/appInterfaces';
export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [routeLines, setRouteLines] = useState<Location[]>([]);
  const [initialPosition, setInitialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const watchId = useRef<number>();

  const isMounted = useRef(true);
  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    getCurrentLocation().then(location => {
      if (!isMounted.current) return;
      setInitialPosition(location);
      setUserLocation(location);
      setHasLocation(true);
      setRouteLines(routes => [...routes, location]);
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
        if (!isMounted.current) return;
        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        setUserLocation(location);
        setRouteLines(routes => [...routes, location]);
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
    routeLines,
    userLocation,
    getCurrentLocation,
    hasLocation,
    initialPosition,
    followUserLocation,
    stopFollowUserLocation,
  };
};
