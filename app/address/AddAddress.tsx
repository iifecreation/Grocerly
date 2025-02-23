import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper';
import { COLORS } from '@/theme/colors';
import ArchBorder from '@/components/ArchBorder';
import MainPageHeader from '@/components/MainPageHeader';
import { useTranslation } from 'react-i18next';
import { SAFE_AREA_PADDING } from '@/utils/utils';
import AddressIcon from "@/components/icons/AddressIcon"
import CustomButton from '@/components/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { APP_ROUTES } from '@/contants/app-routes';
import TextInputComp from '@/components/Input';
import { Controller, useForm } from 'react-hook-form';
import InputDropDown from '@/components/common/Dropdown/InputDropDown';
import axios from 'axios';
import { getUserLocation } from '@/utils/location';
import MapView, { Marker } from 'react-native-maps';

 // Function to fetch cities based on the passed country and state
const fetchApiData = async (url: string, data: any) => {
  try {
    const response = await axios.post( url, data,
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.status === 200 || response.data) {
      return response;
    } else {
      throw new Error('Failed to fetch cities');
    }
  } catch (error) {
    throw new Error('Failed to fetch cities');
  }
};

const AddAddress = () => {
    const {t} = useTranslation();
    const router = useRouter()
    const {control, handleSubmit, formState: {errors}} = useForm();
    const [isFocus, setIsFocus] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [location, setLocation] = useState<any>({});
    const [citiesData, setCitiesData] = useState<any>([])
    const [stateData, setStateData] = useState<any>([])

    const fetchLocation = async () => {
        try {
          const locationData = await getUserLocation();
          setLocation(locationData); 
        } catch (error) {
          console.log(error);
        }
    };

    const typeData = [
        { label: t("account.Address.type.home"), value: t("account.Address.type.home") },
        { label: t("account.Address.type.office"), value: t("account.Address.type.office") },
        { label: t("account.Address.type.other"), value: t("account.Address.type.other") },
    ];

    const addAddress = () => {
          router.push(APP_ROUTES.ADD_ADDRESS)
        }

    const onSubmit = async (data: any) => {
        try {
          // Send data to the server (replace with your actual API endpoint)
        //   const response = await axios.post('https://your-api.com/submit', data);
          console.log('Server Response:');
        } catch (error) {
          console.error('Error submitting data:', error);
        }
    };

    useEffect(() => {
        fetchLocation()
    }, [])

    // Separate function to fetch cities:
    const fetchCities = async () => {
        const response = await fetchApiData('https://countriesnow.space/api/v0.1/countries/state/cities', 
            { country: location?.country, state: `${selectedState == `Lagos` ? selectedState + ' state' : selectedState}` })
        const cities = response?.data?.data.map((city: any) => ({
            label: city,
            value: city
        }));
        setCitiesData(cities)
    };

    const fetchStates = async () => {
        const response = await fetchApiData('https://countriesnow.space/api/v0.1/countries/states', { country: location?.country })
        setStateData(response?.data?.data?.states)   
    };

    useEffect(() => {
        if (location?.country) {
            fetchStates();
        }
    }, [location])

    useEffect(() => {
        if (selectedState) {
            fetchCities();
        }
    }, [selectedState])
  
    return (
        <ScreenWrapper background={COLORS.light.primary}>
        <View className="flex-1 bg-white">
            <ArchBorder>
            <MainPageHeader name={t("account.Address.add_Address.title")} />
            </ArchBorder>

            <ScrollView style={styles.headerDesc} showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{flex: 1}}
                >
                    <View className='w-full gap-y-3'>
                        <Controller
                            control={control}
                            name="Address line"
                            render={({field: {onChange, onBlur, value}}) => (
                            <TextInputComp
                                placeholder={t('account.Address.title')}
                                value={value}
                                handleBlur={onBlur}
                                onChangeText={onChange}
                                errorMessage={errors?.['Address line']?.message}
                                id="email"
                            />
                            )}
                        />

                        {/* city */}
                        <InputDropDown isFocus={isFocus} placeholder={t("account.Address.State")} selectedType={selectedState} setSelected={setSelectedState} typeData={stateData} setIsFocus={setIsFocus} valueFieldValue="name" labelFieldValue="name" />

                        {/* state  */}
                        <InputDropDown isFocus={isFocus} placeholder={t("account.Address.Select_City")} selectedType={selectedCity} setSelected={setSelectedCity} typeData={citiesData} setIsFocus={setIsFocus} valueFieldValue="value" labelFieldValue="label" />

                        <Controller
                            control={control}
                            name="Zip/Postal Code"
                            render={({field: {onChange, onBlur, value}}) => (
                            <TextInputComp
                                placeholder={t('account.Address.zip_code')}
                                value={value}
                                handleBlur={onBlur}
                                onChangeText={onChange}
                                errorMessage={errors?.['Zip/Postal Code']?.message}
                                id="email"
                            />
                            )}
                        />

                        {/* type */}
                        <InputDropDown isFocus={isFocus} placeholder={t("account.Address.Select_type")} selectedType={selectedType} setSelected={setSelectedType} typeData={typeData} setIsFocus={setIsFocus} valueFieldValue="value" labelFieldValue="label" />

                        <View className='w-full items-center mt-5 mb-10'>
                            
                            <View style={styles.container}>
                                {/* <MapView 
                                    style={styles.map}
                                        initialRegion={{
                                        latitude: 37.78825,
                                        longitude: -122.4324,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }} 
                                /> */}
                            </View>

                            <CustomButton navigateProps={addAddress} textProps={t("button.add_Address")}>
                                <Ionicons name="location-outline" size={24} color="#ffffff" />
                            </CustomButton>
                        </View>
                    </View>
                    
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
        </ScreenWrapper>
    )
}

export default AddAddress

const styles = StyleSheet.create({
    headerDesc: {
        width: "100%",
        paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
        flex: 1
    },
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
