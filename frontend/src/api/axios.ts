import axios from 'axios';

export const instance = axios.create({
    baseURL: "https://grupo-d-2023-1-production.up.railway.app"
});
