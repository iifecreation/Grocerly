import * as Location from 'expo-location';

// Function to get the user location and reverse geocode it
export const getUserLocation = async () => {
  try {
    // Request permission to access the location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    // Get user's current location
    const { coords } = await Location.getCurrentPositionAsync({});

    // Reverse geocode the location to get the state and country
    const geoInfo = await Location.reverseGeocodeAsync({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    if (geoInfo.length > 0) {
      const { region, country } = geoInfo[0]; // region is typically the state
      return { state: region, country };
    }

    // Return default values if geocoding fails
    return { state: 'Unknown', country: 'Unknown' };
  } catch (error) {
    console.error('Error getting location:', error);
    return { state: 'Unknown', country: 'Unknown' };
  }
};
