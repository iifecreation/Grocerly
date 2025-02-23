import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-chart-kit'
import { useQuery } from '@tanstack/react-query';
import { QUERY_ENUM } from '@/contants';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';

const screenWidth = Dimensions.get("window").width;
// Function to get the day of the week from a date
const getDayOfWeek = (date: any) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = new Date(date).getDay();
  return days[day];
};

const LineChartComp = () => {

    const {
        isLoading,
        isFetching,
        error,
        isError,
        data: wallet,
    } = useQuery({
        queryKey: [QUERY_ENUM.REDEEMCHART],
        queryFn: async () => {
          return await axiosInstance.get(API_ROUTES.REDEEMCHART);
        },
    });
    
      // const redeemChart = useMemo(() => wallet?.data, [wallet]);
    const redeemChart = {
    "data": [
        { "date": "2025-02-23", "totalReferrals": 200 },
        { "date": "2025-02-24", "totalReferrals": 145 },
        { "date": "2025-02-25", "totalReferrals": 70 },
        { "date": "2025-02-26", "totalReferrals": 120 },
        { "date": "2025-02-27", "totalReferrals": 150 },
        { "date": "2025-02-28", "totalReferrals": 170 },
        { "date": "2025-03-01", "totalReferrals": 210 }
    ],
    "message": "Referral Chart Fetched successfully"
    };

  return (
    <LineChart
        data={{
        labels: redeemChart?.data.map((item: any) => getDayOfWeek(item.date)),
        datasets: [
            {
            data: redeemChart?.data.map((item: any) => item.totalReferrals)
            }
        ]
        }}
        width={screenWidth * 0.9} // To make it fit in the screen
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={50}
        bezier
        chartConfig={{
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(241, 90, 34, ${opacity})`, // Blue color for line
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for labels
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#F15A22'
        },
        // yAxisValues: [0, 50, 100, 150, 200, 250],
        }}
        style={{
        // marginVertical: 8,
        width: "100%",
        borderRadius: 16
        }}
    />
  )
}

export default LineChartComp

const styles = StyleSheet.create({})