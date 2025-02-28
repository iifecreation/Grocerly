import { MMKV } from 'react-native-mmkv';

export const ORDER_DETAILS = 'order-storage';

const storage = new MMKV();

// Helper function to get order from MMKV
export const getOrderDetails = () => {
    const order = storage.getString(ORDER_DETAILS);
    return order ? JSON.parse(order) : [];
};

// Helper function to save order to MMKV
export const saveOrderDetails = (cart: any) => {
    return storage.set(ORDER_DETAILS, JSON.stringify(cart));
};

export const deleteOrderDetails = () => {
    saveOrderDetails([]);
};
