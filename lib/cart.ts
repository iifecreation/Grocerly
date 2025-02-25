import { MMKV } from 'react-native-mmkv';

export const CART_STORAGE = 'cart-storage';

const storage = new MMKV();

// Helper function to get cart from MMKV
export const getCart = () => {
    const cart = storage.getString(CART_STORAGE);
    return cart ? JSON.parse(cart) : [];
};

// Helper function to save cart to MMKV
export const saveCart = (cart: any) => {
    return storage.set(CART_STORAGE, JSON.stringify(cart));
};

// Increment quantity
export const incrementQuantity = (item: any) => {
    const currentCart = getCart();
    const productIndex = currentCart.findIndex((product: any) => product.id === item.id);

    if (productIndex !== -1) {
        currentCart[productIndex].count += 1; // Increment quantity
        currentCart[productIndex].totalPrice = currentCart[productIndex].price * currentCart[productIndex].count;
        saveCart(currentCart);
    }
};

// Decrement quantity
export const decrementQuantity = (item: any) => {
    const currentCart = getCart();
    const productIndex = currentCart.findIndex((product: any) => product.id === item.id);

    if (productIndex !== -1 && currentCart[productIndex].count > 1) {
        currentCart[productIndex].count -= 1; // Decrement quantity
        currentCart[productIndex].totalPrice = currentCart[productIndex].price * currentCart[productIndex].count;
        saveCart(currentCart);
    }
};

export const deleteSingleProduct = (item: any) => {
    const currentCart = getCart();
    const productIndex = currentCart.findIndex((product: any) => product.id === item.id);

    // Check if the product is found in the cart
    if (productIndex !== -1) {
        currentCart.splice(productIndex, 1); 
        saveCart(currentCart);
    }
};

export const deleteAllProduct = () => {
    saveCart([]);
};
