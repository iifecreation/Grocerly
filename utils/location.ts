import * as Location from 'expo-location';

const fetchLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        return 'Permission to access location was denied'
      }

      let locationData = await Location.getCurrentPositionAsync({});
    }
    catch(err){

    }
};