import {useState} from 'react';
import {createContext} from 'react';
import {PermissionStatus} from 'react-native-permissions';
import React from 'react';
export interface PermissionsState {
  locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({children}: any) => {
  const [permissions, setPermissions] = useState(permissionInitState);
  const askLocationPermission = () => {};
  const checkLocationPermission = () => {};
  return (
    <PermissionsContext.Provider
      value={{permissions, checkLocationPermission, askLocationPermission}}>
      {children}
    </PermissionsContext.Provider>
  );
};
