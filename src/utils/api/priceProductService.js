import { axiosDelete, axiosGet, axiosPost, axiosPut } from "./axiosService";

export const getProductPrice = async () => {
    try {
        return await axiosGet('/productPrice/list');;
    } catch (error) {
        throw error;
    }
};

export const getProductPriceByFilter = async (filter) => {
    try {
        return await axiosGet(`/productPrice/list?${filter}`);
    } catch (error) {
        throw error;
    }
};

export const deleteProductPrice = async (id) => {
    try {
        await axiosDelete(`/productPrice/item/${id}`);
        return
    } catch (error) {
        throw error;
    }
}

export const addProductPrice = async (newItem) => {
    try {
        await axiosPost('/productPrice/item', newItem)
        return
    } catch (error) {
        throw error;
    }
}

export const updateProductPrice = async (id, updatedItem) => {
    
    try {
        await axiosPut(`/productPrice/item/${id}`, updatedItem)
        return
    } catch (error) {
        throw error;
    }
}

