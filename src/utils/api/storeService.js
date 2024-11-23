import { axiosDelete, axiosGet, axiosPost, axiosPut } from "./axiosService";

export const getStores = async () => {
    try {
        return await axiosGet('/store/list');
    } catch (error) {
        throw error;
    }
};

export const deleteStore = async (id) => {
    try {
        await axiosDelete(`/store/item/${id}`);
        return
    } catch (error) {
        throw error;
    }
}

export const addStore = async (newItem) => {
    try {
        await axiosPost('/store/item', newItem)
        return
    } catch (error) {
        throw error;
    }
}

export const updateStore = async (id, updatedItem) => {
    
    try {
        await axiosPut(`/store/item/${id}`, updatedItem)
        return
    } catch (error) {
        throw error;
    }
}

