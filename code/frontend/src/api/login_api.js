import axios from 'axios';
import { API_BASE_URL } from "./base_api";

export const login = async (email, password) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/recognition/detect-face/`);
        console.log(response)
        
        if (response.data) {
            localStorage.setItem('user_token', response.data.access);
            localStorage.setItem('user_refresh_token', response.data.refresh);
            return response.data;
        } else {
            throw new Error("Tokens não encontrados na resposta");
        }

    } catch (error) {
        console.error("Erro ao fazer login:", error.response?.data || error.message);
        throw error;
    }
};