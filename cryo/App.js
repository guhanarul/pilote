import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';



// Call this function before attempting to get the location
//requestLocationPermission();

const App = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  const fetchCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          resolve({ latitude, longitude });
        },
        error => {
          console.error('Error fetching location:', error);
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };

  const setupMap = async () => {
    try {
      const location = await fetchCurrentLocation();
      setInitialRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error('Error setting up map:', error);
    }
  };

  useEffect(() => {
    setupMap();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {initialRegion ? (
        <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Current Location"
              description="Your device's current location"
            />
          )}
        </MapView>
      ) : (
        <Text>Loading the map for you ....!</Text>
      )}
    </View>
  );
};

export default App;
/*
drone location,distance time between two points

*/
/*const App=()=>{
  //const[initialloc,setinitialloc]=useState(null);
  const[currentloc,setcurrentloc]=useState(null);
  async function getper() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location for better services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  getper();
  const getlocation=()=>{
    Geolocation.getCurrentPosition(
        position=>{
            const{latitude,longitude}=position.coords;
            setcurrentloc({latitude,longitude});
        },
        error=>{
            console.warn(error);
        }
    );
  };
  useEffect(()=>{
    getlocation();  
  },[]);
  return(
   <View style={{flex:1}}>
     {currentloc ? (
      <MapView style={{flex:1}} initialRegion={{
        latitude:currentloc.latitude,
        longitude:currentloc.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
        {currentloc && (    
            <Marker
              coordinate={{
                latitude: currentloc.latitude,
                longitude: currentloc.longitude,
              }}
              title="Current Location"
              description="Your device's current location"
            />
          )}

      </MapView>
     ): (<Text>Loading the map..! </Text>)
     }
   </View>
  )
}
export default App;*/