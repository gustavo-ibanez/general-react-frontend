import { axiosDelete, axiosGet, axiosPost, axiosPut } from "./axiosService";

export const getProducts = async () => {
    try {
        return await axiosGet('/product/list');
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        await axiosDelete(`/product/item/${id}`);
        return
    } catch (error) {
        throw error;
    }
}

export const addProduct = async (newItem) => {
    try {
        await axiosPost('/product/item', newItem)
        return
    } catch (error) {
        throw error;
    }
}

export const updateProduct = async (id, updatedItem) => {
    
    try {
        await axiosPut(`/product/item/${id}`, updatedItem)
        return
    } catch (error) {
        throw error;
    }
}

