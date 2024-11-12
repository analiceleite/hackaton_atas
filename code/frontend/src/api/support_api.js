import axios from 'axios';
import { API_BASE_URL } from "./base_api";

// Função para enviar mensagem de suporte
export const support = async (edv, email, message) => {
    try {
        const token = localStorage.getItem("user_token");

        if (!token) {
            throw new Error("Token de autenticação ausente. Faça login novamente.");
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const response = await axios.post(
            `${API_BASE_URL}/api/support/`,
            { edv, email, message },
            config // Inclui o token no cabeçalho
        );

        console.log("Resposta do servidor:", response.data);
        return response.data; // Retorne a resposta para uso posterior
    } catch (error) {
        console.error("Erro ao enviar mensagem:", error.response?.data || error.message);
        throw error; // Lança o erro para ser tratado no componente
    }
};
