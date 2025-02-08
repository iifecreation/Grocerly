import AsyncStorage from "@react-native-async-storage/async-storage";

// Helper function to get cart from AsyncStorage
export const getCart = async () => {
    const cart = await AsyncStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

// Helper function to save cart to AsyncStorage
export const saveCart = async (cart: any) => {
    return await AsyncStorage.setItem('cart', JSON.stringify(cart));
};

// Increment quantity
export const incrementQuantity = async (item: any) => {
    const currentCart = await getCart();
    const productIndex = currentCart.findIndex((product: any) => product.id === item.id);

    if (productIndex !== -1) {
        currentCart[productIndex].count += 1; // Increment quantity
        await saveCart(currentCart);
    }
};

// Decrement quantity
export const decrementQuantity = async (item: any) => {
    const currentCart = await getCart();
    const productIndex = currentCart.findIndex((product: any) => product.id === item.id);

    if (productIndex !== -1 && currentCart[productIndex].count > 1) {
    currentCart[productIndex].count -= 1; // Decrement quantity
    await saveCart(currentCart);
    }
};

export const deleteSingleProduct = async (item: any) => {
    const currentCart = await getCart();
    const productIndex = currentCart.findIndex((product: any) => product.id === item.id);

    // Check if the product is found in the cart
    if (productIndex !== -1) {
        currentCart.splice(productIndex, 1); 
        await saveCart(currentCart);
    }
};

export const deleteAllProduct = async () => {
    const currentCart = await getCart();
    await saveCart([]);
};