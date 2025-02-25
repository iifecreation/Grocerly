import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { API_ROUTES } from '@/contants/api-routes';
import axiosInstance from '@/api/config';
import { QUERY_ENUM } from '@/contants';
import { useQuery } from '@tanstack/react-query';
import { BarChart } from 'react-native-gifted-charts';
import { ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const BarChartComp = ({showData}: {showData: any}) => {
    const {t} = useTranslation();
    const {
        isLoading,
        isFetching,
        error,
        isError,
        data: Chart,
    } = useQuery({
        queryKey: [QUERY_ENUM.SAVINGCHART],
        queryFn: async () => {
            return await axiosInstance.get(API_ROUTES.SAVINGCHART);
        },
    });
    
    const displayChart = useMemo(() => Chart?.data, [Chart]);

    const formattedData = displayChart?.data?.map((item: any) => ({
        value: item.totalSavings > 0 ? item.totalSavings : 5,
        realValue: item.totalSavings ,
        label: new Date(item.date).toLocaleString('en-US', { weekday: 'short' }),
        date: new Date(item.date).toLocaleDateString()
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
                    <Text className='text-base font-bold text-center'>{t("Finance.mySaving.error")}</Text>
                </View>
                )
            :
            (
                <BarChart
                    data={formattedData}
                    width={320} // Adjust width as needed
                    height={250}
                    frontColor={showData?.length == 0 ? "#D9D9D9" : '#4CAF50'}
                    barWidth={25}
                    spacing={20}
                    initialSpacing={10}
                    maxValue={250}
                    stepValue={50}
                    showYAxisIndices={true}
                    isAnimated
                    renderTooltip={(item: any, index: any) => (
                          <View style={{marginBottom: 20,marginLeft: -6,backgroundColor: '#ffcefe', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 4, alignItems: "center" }}>
                            <Text className='font-bold'>{item.realValue}</Text>
                            <Text>{item.date}</Text>
                          </View>
                        )
                      }
                />
            )
        }
    </View>
  )
}

export default BarChartComp

const styles = StyleSheet.create({})