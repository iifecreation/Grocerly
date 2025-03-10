import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch } from 'react'
import { Calendar } from 'react-native-calendars';
import { COLORS } from '@/theme/colors';

const CalendarComp = ({setSelectedDate, minDateValue, maxDateValue, selectedDate}: 
  {setSelectedDate: Dispatch<React.SetStateAction<string>>, minDateValue: string,  maxDateValue: string, selectedDate: string}) => {
  return (
    <Calendar
      onDayPress={(day: any) => {
        const selectedDate = day.dateString;
        console.log(selectedDate);
        
        setSelectedDate(selectedDate);
      }}
      markedDates={{
        [selectedDate]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        selectedDayBackgroundColor: COLORS.light.primary,
        selectedDayTextColor: '#ffffff',
        dayTextColor: COLORS.light.primary,
        arrowColor: COLORS.light.primary,
        todayTextColor: "#000000",
      }}
      enableSwipeMonths={true}
      minDate= {minDateValue}
      maxDate= {maxDateValue}
    />
    
  )
}

export default CalendarComp

const styles = StyleSheet.create({})