import axios from 'axios';

const resolveBaseUrl = () => {
    // Prefer env override
    if (process.env.NEXT_PUBLIC_API_BASE_URL) return process.env.NEXT_PUBLIC_API_BASE_URL;

    const defaultBackend = 'http://localhost:5185/api';

    if (typeof window !== 'undefined') {
        try {
            const url = new URL(window.location.origin);
            if (url.port === '3000') {
                url.port = '5185';
                url.pathname = '/api';
                return url.toString();
            }
        } catch {
            // ignore
        }
    }

    return defaultBackend;
};

const API_BASE_URL = resolveBaseUrl();
console.log('API_BASE_URL:', API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default api;
