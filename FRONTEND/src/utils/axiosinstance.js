import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://linkshort-tudg.onrender.com",
    timeout: 10000, // 10s
    withCredentials: true // Include cookies
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response, request, message } = error;
        let errorMessage = 'An unexpected error occurred';
        let errorCode = 'UNKNOWN_ERROR';

        if (response) {
            const { status, data } = response;
            switch (status) {
                case 400: errorMessage = data?.message || 'Invalid request.'; errorCode = 'BAD_REQUEST'; break;
                case 401:
                    errorMessage = 'Authentication required. Please log in.';
                    errorCode = 'UNAUTHORIZED';
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userData');
                    if (window.location.pathname !== '/auth') {
                        window.location.href = '/auth';
                    }
                    break;
                case 403: errorMessage = 'Access denied.'; errorCode = 'FORBIDDEN'; break;
                case 404: errorMessage = data?.message || 'Not found.'; errorCode = 'NOT_FOUND'; break;
                case 409: errorMessage = data?.message || 'Conflict.'; errorCode = 'CONFLICT'; break;
                case 422: errorMessage = data?.message || 'Validation failed.'; errorCode = 'VALIDATION_ERROR'; break;
                case 429: errorMessage = 'Too many requests.'; errorCode = 'RATE_LIMIT'; break;
                case 500: errorMessage = 'Server error.'; errorCode = 'SERVER_ERROR'; break;
                case 502: case 503: case 504:
                    errorMessage = 'Service unavailable.'; errorCode = 'SERVICE_UNAVAILABLE'; break;
                default:
                    errorMessage = data?.message || `HTTP ${status}`; errorCode = 'HTTP_ERROR';
            }
        } else if (request) {
            if (message.includes('timeout')) {
                errorMessage = 'Request timeout.'; errorCode = 'TIMEOUT';
            } else if (message.includes('Network Error')) {
                errorMessage = 'Network error.'; errorCode = 'NETWORK_ERROR';
            } else {
                errorMessage = 'Connection failed.'; errorCode = 'CONNECTION_ERROR';
            }
        } else {
            errorMessage = message || 'Unexpected error';
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
