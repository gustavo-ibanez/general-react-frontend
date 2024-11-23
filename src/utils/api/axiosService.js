import axios from 'axios';

export const axiosService = axios.create({
    baseURL: 'http://localhost:5000/api', 
    timeout: 5000,                   
    headers: {
        'Content-Type': 'application/json',
    }
});

export const axiosGet = async (url) => {
    try {
        return await axiosService.get(url);
    } catch (error) {
        throw error;
    }
};

export const axiosDelete = async (url) => {
    try {
        await axiosService.delete(url);
        return
    } catch (error) {
        throw error;
    }
}

export const axiosPost = async (url, newItem) => {
    try {
        await axiosService.post(url, newItem)
        return
    } catch (error) {
        throw error;
    }
}

export const axiosPut = async (url, updatedItem) => {
    
    try {
        await axiosService.put(url, updatedItem)
        return
    } catch (error) {
        throw error;
    }
}