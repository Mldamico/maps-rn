import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BlackButton} from '../components/BlackButton';
import {PermissionsContext} from '../context/PermissionsContext';

export const PermissionsScreen = () => {
  const {permissions, askLocationPermission} = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Es necesario el uso de GPS para el uso de esta aplicacion
      </Text>

      <BlackButton title="Permiso" onPress={askLocationPermission} />
      <Text style={{marginTop: 20}}>
        {JSON.stringify(permissions, null, 5)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 250,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});
