
import axiosInstance from '../utils/axiosinstance.js'

export const createShortUrl = async (url, customSlug) => {
    const payload = { url };
    if (customSlug) {
        payload.slug = customSlug;
    }

    const { data } = await axiosInstance.post("/api/create", payload);
    return data;
};

export const getUserUrls = async () => {
    const { data } = await axiosInstance.get("/api/urls");
    return data;
};

export const deleteUrl = async (urlId) => {
    const { data } = await axiosInstance.delete(`/api/urls/${urlId}`);
    return data;
};