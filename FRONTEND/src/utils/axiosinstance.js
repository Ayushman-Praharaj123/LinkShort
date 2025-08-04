import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "https://link-short-9mvs.vercel.app/",// Change this to your backend URL while hosting 
    timeout: 10000, // 10s
    withCredentials: true // Include cookies in requests
})

axiosInstance.interceptors.response.use(
    (response) => {

        return response;
    },
    (error) => {

        const { response, request, message } = error;

        let errorMessage = 'An unexpected error occurred';
        let errorCode = 'UNKNOWN_ERROR';

        if (response) {

            const { status, data } = response;

            switch (status) {
                case 400:
                    errorMessage = data?.message || 'Invalid request. Please check your input.';
                    errorCode = 'BAD_REQUEST';
                    break;
                case 401:
                    errorMessage = 'Authentication required. Please log in.';
                    errorCode = 'UNAUTHORIZED';

                    localStorage.removeItem('authToken');

                    break;
                case 403:
                    errorMessage = 'Access denied. You don\'t have permission to perform this action.';
                    errorCode = 'FORBIDDEN';
                    break;
                case 404:
                    errorMessage = data?.message || 'The requested resource was not found.';
                    errorCode = 'NOT_FOUND';
                    break;
                case 409:
                    errorMessage = data?.message || 'This URL already exists or there\'s a conflict.';
                    errorCode = 'CONFLICT';
                    break;
                case 422:
                    errorMessage = data?.message || 'Invalid data provided.';
                    errorCode = 'VALIDATION_ERROR';
                    break;
                case 429:
                    errorMessage = 'Too many requests. Please try again later.';
                    errorCode = 'RATE_LIMIT';
                    break;
                case 500:
                    errorMessage = 'Server error. Please try again later.';
                    errorCode = 'SERVER_ERROR';
                    break;
                case 502:
                case 503:
                case 504:
                    errorMessage = 'Service temporarily unavailable. Please try again later.';
                    errorCode = 'SERVICE_UNAVAILABLE';
                    break;
                default:
                    errorMessage = data?.message || `Request failed with status ${status}`;
                    errorCode = 'HTTP_ERROR';
            }
        } else if (request) {

            if (message.includes('timeout')) {
                errorMessage = 'Request timeout. Please check your connection and try again.';
                errorCode = 'TIMEOUT';
            } else if (message.includes('Network Error')) {
                errorMessage = 'Network error. Please check your internet connection.';
                errorCode = 'NETWORK_ERROR';
            } else {
                errorMessage = 'Unable to connect to the server. Please try again later.';
                errorCode = 'CONNECTION_ERROR';
            }
        } else {

            errorMessage = message || 'An unexpected error occurred';
            errorCode = 'UNKNOWN_ERROR';
        }


        const enhancedError = {
            ...error,
            message: errorMessage,
            code: errorCode,
            status: response?.status,
            data: response?.data,
            timestamp: new Date().toISOString()
        };


        console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: response?.status,
            message: errorMessage,
            code: errorCode,
            timestamp: enhancedError.timestamp
        });


        return Promise.reject(enhancedError);
    }
);

export default axiosInstance;