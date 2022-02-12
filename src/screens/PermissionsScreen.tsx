import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { PermissionsContext } from '../context/PermissionsContext';


export const PermissionsScreen = () => {

    const { permissions,askLocationPermission } = useContext( PermissionsContext );

  return (
    <View style={ styles.container }>
        <Text style={ styles.title }> Es necesario el uso del GPS para usar esta aplicación </Text>

        <Button
            title='Permission'
            onPress={ askLocationPermission }
        />

        <Text style={{marginTop: 20}} >{ JSON.stringify( permissions, null, 3 ) }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        width: 200,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
});