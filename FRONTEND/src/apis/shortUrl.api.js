
import axios from 'axios'
import axiosInstance from '../utils/axiosinstance.js'
export const createShortUrl = async (url, customSlug) => {
    const payload = { url };
    if (customSlug) {
        payload.slug = customSlug;
    }

    const { data } = await axiosInstance.post("/api/create", payload);
    return data;
};