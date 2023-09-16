import axios from 'axios';

export const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});
