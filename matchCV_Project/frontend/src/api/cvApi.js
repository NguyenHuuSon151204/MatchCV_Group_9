import api from './axiosConfig';
import { getUserId } from '../utils/auth';

const BASE_PATH = '/CV';

// Helper to unwrap response data handling both camelCase and PascalCase
const unwrapResponse = (response) => {
    if (!response || !response.data) return response;

    const data = response.data;
    // Check for standard 'data' (camelCase) or 'Data' (PascalCase) property in BaseResponseDto
    if (data.data !== undefined) return data.data;
    if (data.Data !== undefined) return data.Data;

    // If neither exists, return the whole data object (might be the DTO itself or a different structure)
    return data;
};

export const saveCV = async (cvData) => {
    try {
        const userId = getUserId();
        // userId must be a query parameter as per CVController
        const response = await api.post(`${BASE_PATH}/save?userId=${userId}`, { ...cvData, userId });
        return unwrapResponse(response);
    } catch (error) {
        console.error('Error saving CV:', error);
        throw error;
    }
};

export const getCVHistory = async () => {
    try {
        const userId = getUserId();
        // Endpoint is /api/cv/user/{userId}
        const response = await api.get(`${BASE_PATH}/user/${userId}`);
        return unwrapResponse(response);
    } catch (error) {
        console.error('Error fetching CV history:', error);
        throw error;
    }
};

export const getCVById = async (id) => {
    if (!id) {
        throw new Error('CV ID is required');
    }
    try {
        const userId = getUserId();
        const response = await api.get(`${BASE_PATH}/${id}?userId=${userId}`);
        return unwrapResponse(response);
    } catch (error) {
        console.error(`Error fetching CV with id ${id}:`, error);
        throw error;
    }
};

export const deleteCV = async (id) => {
    try {
        const userId = getUserId();
        const response = await api.delete(`${BASE_PATH}/${id}?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting CV with id ${id}:`, error);
        throw error;
    }
};

export const uploadCVFile = async (id, file) => {
    try {
        const userId = getUserId();
        const formData = new FormData();
        formData.append('file', file);

        let url = `${BASE_PATH}/upload?userId=${userId}`;
        if (id) {
            url += `&id=${id}`;
        }

        const response = await api.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return unwrapResponse(response);
    } catch (error) {
        console.error('Error uploading CV file:', error);
        throw error;
    }
};
