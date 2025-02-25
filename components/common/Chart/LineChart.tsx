import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native'
import React, { useMemo } from 'react'
// import { LineChart } from 'react-native-chart-kit'
import { useQuery } from '@tanstack/react-query';
import { QUERY_ENUM } from '@/contants';
import axiosInstance from '@/api/config';
import { API_ROUTES } from '@/contants/api-routes';
import { LineChart } from "react-native-gifted-charts";
import { useTranslation } from 'react-i18next';

const screenWidth = Dimensions.get("window").width;

const customDataPoint = () => {
  return (
      <View
      style={{
        width: 10, height: 10, backgroundColor: 'white', borderWidth: 2, borderRadius: 10, borderColor: '#F15A22',
      }}
      />
  );
};

const LineChartComp = ({nodata= false}: {nodata?: boolean}) => {
  const {t} = useTranslation();
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
  
  const redeemChart = useMemo(() => wallet?.data, [wallet]);
  
  const apiData = {
    data: [
      { date: "2025-02-23", totalReferrals: 30 },
      { date: "2025-02-24", totalReferrals: 210 },
      { date: "2025-02-25", totalReferrals: 90 },
      { date: "2025-02-26", totalReferrals: 150 },
      { date: "2025-02-27", totalReferrals: 220 },
      { date: "2025-02-28", totalReferrals: 170 },
      { date: "2025-03-01", totalReferrals: 90 }
    ]
  };

  const formattedData = redeemChart?.data?.map((item: any) => ({
    value: item.totalReferrals > 0 ? item.totalReferrals : 5,
    realValue: item.totalReferrals ,
    label: new Date(item.date).toLocaleString('en-US', { weekday: 'short' }),
    date: new Date(item.date).toLocaleDateString(),
    customDataPoint: customDataPoint
  }));

  const noformattedData = apiData.data.map(item => ({
    value: item.totalReferrals,
    label: new Date(item.date).toLocaleString('en-US', { weekday: 'short' }),
    date: new Date(item.date).toLocaleDateString(),
    customDataPoint: customDataPoint
  }));
    

  return (
    <View>
      {
        isLoading || isFetching ? 
          (<ActivityIndicator size='large' className='items-center justify-center w-full' />)
        :
        error 
        ? (
            <View>
                <Text className='text-base font-bold text-center'>{t("Finance.Redeem.error")}</Text>
            </View>
            )
        :
        (
          <LineChart
            areaChart
            data={nodata ? noformattedData :formattedData}
            thickness={nodata? 0 : 2}
            hideDataPoints={nodata}
            curved
            width={screenWidth * 0.73} // Adjust width as needed
            height={250}
            startFillColor="#F15A22"
            color="#F15A22"
            startOpacity={0.31}
            endFillColor="#FFEDEF"
            stripColor="#F15A22"
            endOpacity={0.31}
            spacing={50}
            initialSpacing={20}
            maxValue={250}
            stepValue={50}
            showYAxisIndices={true}
            isAnimated
            animateOnDataChange
            animationDuration={1000}
            onDataChangeAnimationDuration={300}
            // Conditionally apply pointerConfig if nodata is true
            pointerConfig={
              !nodata
              ? {
                    pointerStripUptoDataPoint: true,
                    pointerStripColor: 'lightgray',
                    pointerStripWidth: 2,
                    strokeDashArray: [2, 5],
                    pointerColor: 'lightgray',
                    radius: 4,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 120,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: (items: any) => {
                      return (
                        <View
                          style={{
                            height: 'auto',
                            width: 'auto',
                            backgroundColor: '#282C3E',
                            borderRadius: 4,
                            justifyContent: 'center',
                            padding: 10,
                          }}
                        >
                          <Text style={{ color: 'lightgray', fontSize: 12 }}>
                            {items[0].realValue}
                          </Text>
                          <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            {items[0].date}
                          </Text>
                        </View>
                      );
                    },
                  }
              : {}
            }
          />
        )
      }
    </View>
  )
}

export default LineChartComp

const styles = StyleSheet.create({})