import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';

const LocationPicker = ({ country, state }: { country: string; state: string }) => {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState(false);
  const {t} = useTranslation();

  // Function to fetch cities based on the passed country and state
  const fetchCities = async () => {
    try {
      setLoading(true);
      setError(false); // Reset error state on each fetch attempt

      const response = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/state/cities',
        { country, state },
        { headers: { 'Content-Type': 'application/json' } }
      );
   
      if (response.status === 200 || response.data) {
        setCities(response.data.data);
        // Convert the 'data' array into an array of objects with 'label' and 'value'
        const cities = response?.data?.data.map((city: any) => ({
          label: city,
          value: city
        }));

        setCities(cities);
      } else {
        setCities([]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      setCities([]);
      console.error('Error fetching cities: ', error);
      // Retry with the state added to the URL if the first call fails
      setTimeout(() => {
        fetchCitiesWithStateAppended();
      }, 2000); // Retry after 2 seconds
    }
  };

  // Function to retry fetching cities with state appended
  const fetchCitiesWithStateAppended = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/state/cities',
        { country, state: `${state} state` }, // Appending state
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200 || response.data) {
        // Convert the 'data' array into an array of objects with 'label' and 'value'
        const cities = response?.data?.data.map((city: any) => ({
          label: city,
          value: city
        }));

        setCities(cities);
      } else {
        setCities([]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      setCities([]);
      console.error('Retry Error fetching cities: ', error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [country, state]);

  return (
    <View className='mb-4'>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={cities}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? t("product.filter.dropdown") : '...'}
        searchPlaceholder={t("product.filter.dropdown-search")}
        value={selectedCity}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setSelectedCity(item.value);
          setIsFocus(false);
        }}
      />
      
    </View>
  );
};

export default LocationPicker;


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 50,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});