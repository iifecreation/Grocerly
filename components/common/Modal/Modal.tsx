import { StyleSheet, Text, View, Modal, Dimensions } from 'react-native'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'

const { height } = Dimensions.get('window');

const ModalComponent = (
    {children, modalVisible, setModalVisible, yourHeight}: 
    {children: ReactNode, modalVisible: boolean, setModalVisible: Dispatch<SetStateAction<boolean>>, yourHeight: number}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
      setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView} className='w-full px-6'>
        <View style={[{height: height * yourHeight, width:"100%"}, styles.modalView]}>
          {children}
        </View>
      </View>
    </Modal>
  )
}

export default ModalComponent

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 25,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  })