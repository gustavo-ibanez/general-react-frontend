import { axiosDelete, axiosGet, axiosPost, axiosPut } from "./axiosService";

export const getShoppingList = async () => {
    try {
        return await axiosGet('/shoppingList/list');;
    } catch (error) {
        throw error;
    }
};

export const deleteShoppingList = async (id) => {
    try {
        await axiosDelete(`/shoppingList/item/${id}`);
        return
    } catch (error) {
        throw error;
    }
}

export const addShoppingList = async (newItem) => {
    try {
        await axiosPost('/shoppingList/item', newItem)
        return
    } catch (error) {
        throw error;
    }
}

export const updateShoppingList = async (id, updatedItem) => {
    
    try {
        await axiosPut(`/shoppingList/item/${id}`, updatedItem)
        return
    } catch (error) {
        throw error;
    }
}

