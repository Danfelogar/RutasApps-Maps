import { useEffect, useState, useRef } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {

    const [hasLocation, sethasLocation] = useState(false);

    const [routeLines, setRouteLines] = useState<Location[]>([]);

    const [initialPosition, setInitialPosition] = useState<Location>({
        longitude: 0,
        latitude: 0,
    });

    const [userLocation, setUserLocation] = useState<Location>({
        longitude: 0,
        latitude: 0,
    });

    const watchId = useRef<number>();

    const isMointed = useRef(true);

    useEffect(() => {
      isMointed.current = true;

      return () => {
        isMointed.current = false;
      }
    }, [])

    useEffect(() => {

        getCurrentLocation()
            .then( location =>{

                if( !isMointed.current ) return;

                setInitialPosition(location);
                setUserLocation(location);
                setRouteLines( routes => [ ...routes, location ]);
                sethasLocation(true);
            });

    }, []);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise ((resolve, reject ) =>{
            Geolocation.getCurrentPosition(
                ({ coords }) => {
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    })
                },
                (err) => reject({ err }), // Error
                { enableHighAccuracy:true, timeout:20000, maximumAge: 1000 } //Opciones
            ) ;
        })
    }

    const followUserLocation = ( ) => {
        watchId.current = Geolocation.watchPosition(
            ({ coords }) => {

                if( !isMointed.current ) return;

                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                }
                // console.log(coords)
                setUserLocation( location );

                setRouteLines( routes => [ ...routes, location ]);

            },
            (err) => console.log({ err }), // Error
            { enableHighAccuracy:true, distanceFilter: 10 } //Opciones
        ) ;
    }

    const stopFollowUserLocation = () => {

        if( watchId.current ){
            Geolocation.clearWatch( watchId.current );
        }

    }

    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines,
    }
}
