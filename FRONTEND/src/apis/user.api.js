import axiosInstance from '../utils/axiosinstance.js'
export const registerUser = async (name, email, password) => {
    const { data } = await axiosInstance.post("/api/auth/register", { name, email, password })
    return data;
};
export const loginUser = async (email, password) => {
    console.log("Making login request to:", "/api/auth/login");
    const response = await axiosInstance.post("/api/auth/login", { email, password });
    console.log("Login response:", response);
    console.log("Response headers:", response.headers);
    console.log("Response data:", response.data);
    return response.data;
};
export const logoutUser = async () => {
    const { data } = await axiosInstance.post("/api/auth/logout")
    return data;
};
