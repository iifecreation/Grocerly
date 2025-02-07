import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import OrderItem from './OrderItem';

type OrderItemDetailsProps = {
  orderData: {items: {quantity: number; product: {name: string}}};
};
// Sample Data

const headers = ['Item', 'Qty'];

const OrderItemDetails = ({orderData}: OrderItemDetailsProps) => {
  return (
    <View className="w-full gap-y-10 py-10">
      <OrderItem orderData={orderData} />
      <SimpleTable data={orderData?.items} headers={headers} />
    </View>
  );
};

export default OrderItemDetails;

const SimpleTable = ({data, headers}: {headers: string[]; data: any}) => {
  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View className="bg-gray-50" style={styles.headerRow}>
        {headers.map((header: string, index: number) => (
          <Text
            className="font-medium text-sm text-black"
            key={index}
            style={styles.headerText}>
            {header}
          </Text>
        ))}
      </View>

      {/* Table Body */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View key={index} className="border-gray-200" style={styles.row}>
            <Text style={styles.cell}>{item?.product?.name}</Text>
            <Text style={styles.cell}>{item?.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    padding: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});
