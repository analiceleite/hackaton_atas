import axios from 'axios';
import { API_BASE_URL } from "./base_api";

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/login/`);
        
        if (response.data.access && response.data.refresh) {
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