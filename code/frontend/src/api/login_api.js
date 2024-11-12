import axios from 'axios';
import { API_BASE_URL } from "./base_api";

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/login/`, {
            email: email,
            password: password
        });

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

export const logout = async () => {
    const refreshToken = localStorage.getItem('user_refresh_token'); // Obtém o refresh token

    console.log("Token de logout:", refreshToken);

    if (!refreshToken) {
        console.error("Token de refresh não encontrado. Usuário não está logado.");
        return { success: false, message: "Token de refresh não encontrado. Usuário não está logado." };
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/logout/`, {
            refresh: refreshToken // Envia o refresh token no corpo da requisição
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`, // Incluí o token de acesso
            }
        });

        // Remover tokens do localStorage
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_refresh_token');

        return { success: true, message: "Logout realizado com sucesso." };
    } catch (error) {
        console.error("Erro durante o logout:", error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data : error.message };
    }
};

export const resetPassword = async (user_email) => {

    if(!checkEmailExists()) {
        console.log("E-mail não existe!")
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/password/email/`,
            { email: user_email },
        );

        if (response.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: response.data.message || "Erro ao resetar senha." };
        }
    } catch (error) {
        console.error("Erro ao resetar senha:", error);
        return { success: false, message: error.message || "Ocorreu um erro desconhecido." };
    }
}

export const checkEmailExists = async (user_email) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/check-email/`, {
            params: { email: user_email }
        });

        return response.status === 200; 
    } catch (error) {
        console.error("Erro ao verificar e-mail:", error);
        return false; 
    }
};

export const redefinePassword = async (uid, token, newPassword) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/password/confirm/`,
            {
                uid,
                token,
                new_password: newPassword,
            },
        );

        if (response.status === 200 || 205) {
            return { success: true, data: response.data || "A senha foi redefinida com sucesso!"};
        } else {
            return { success: false, message: response.data.message || "Erro ao redefinir a senha." };
        }

    } catch (error) {
        console.error("Erro ao redefinir a senha:", error);
        return { success: false, message: error.message || "Ocorreu um erro ao redefinir a senha." };
    }
}

