import React, { createContext, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { PERMISSIONS, PermissionStatus, request, check, openSettings } from 'react-native-permissions';


export interface PermissionsState {
    locationStatus: PermissionStatus;
}

export  const permissionsinitState: PermissionsState = {
    locationStatus: 'unavailable',
}

type PermissionsContextProps = {
    permissions: PermissionsState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}

export const PermissionsContext = createContext({} as PermissionsContextProps);


export const PermissionsProvider = ({ children }: any) => {

    const [permissions, setPermissions] = useState( permissionsinitState );

    useEffect(() => {
        // Fix: Loading infinito en ocaciones
        // por si al minimizar y entrar a la app entro en un bucle de loading
        checkLocationPermission();

        AppState.addEventListener('change', state => {

            if( state !== 'active' ) return;

            checkLocationPermission();
        })

    }, [])

    const askLocationPermission = async() => {
        let permissionStatus: PermissionStatus;

        if( Platform.OS === 'ios' ){

            // permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE )
            permissionStatus = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE )

        } else {

            // permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION )
            permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION )

        }
        if( permissionStatus === 'blocked' ) {
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        })
    }

    const checkLocationPermission = async() => {
        let permissionStatus: PermissionStatus;

        if( Platform.OS === 'ios' ){
            permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE )
        } else {
            permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION )
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });
    }

    return(
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission,
        }}>
            { children }
        </PermissionsContext.Provider>
    )

}