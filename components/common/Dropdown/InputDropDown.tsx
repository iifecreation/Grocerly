import { StyleSheet, } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { Dropdown } from 'react-native-element-dropdown';

const InputDropDown = (
    {isFocus, typeData, selectedType, setIsFocus, placeholder, setSelected, valueFieldValue, labelFieldValue} :
    {isFocus: boolean, typeData: any, selectedType: any, setIsFocus: Dispatch<SetStateAction<boolean>>, placeholder: string, setSelected: Dispatch<SetStateAction<null>>, valueFieldValue: string, labelFieldValue: string}
) => {
  return (
    <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        search={false}
        iconStyle={styles.iconStyle}
        data={typeData}
        maxHeight={300}
        labelField= {labelFieldValue}
        valueField= {valueFieldValue}
        placeholder={placeholder}
        value={selectedType}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
            setSelected(item[valueFieldValue]);
            setIsFocus(false);
        }}
    />
  )
}

export default InputDropDown

const styles = StyleSheet.create({
    dropdown: {
        height: 45,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 15
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
})