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

export const form = async (ata_file, audios_file) => {
    try {
        const formData = new FormData();
        formData.append("ata_file", ata_file);
        formData.append("audio_file", audios_file);
        
        const response = await axios.post(`${API_BASE_URL}/api/v1/arquivos/form/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Embora o axios defina automaticamente, é bom garantir
            }
        });
        
        console.log(response);
        return response
        
    } catch (error) {
        console.error("Erro ao processar dados no axios:", error.response?.data || error.message);
        throw error;
    }
};