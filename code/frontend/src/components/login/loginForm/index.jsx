import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Popup from "../../global/popup";
import { login } from "../../../api/login_api";
import * as S from '../styles';

const Form = () => {
    //* Password visibility functions
    const [passwordVisible, setPasswordVisible] = useState(false);

    //* Popup Settings 
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('');

    //* Fields state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const data = await login(email, password);

            if (data.access && data.refresh) {
                localStorage.setItem('user_token', data.access);
                localStorage.setItem('user_refresh_token', data.refresh);
                console.log("Tokens armazenados:", {
                    access: localStorage.getItem('user_token'),
                    refresh: localStorage.getItem('user_refresh_token')
                });

                setEmail('');
                setPassword('');
                navigate('/import');
            } else {
                console.error("Tokens não recebidos na resposta do login.");
            }
        } catch (error) {
            setPopupMessage('Um erro ocorreu. Credenciais incorretas.');
            setPopupType('error');
            setPopupOpen(true);
    
            setEmail('');
            setPassword('');
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <S.FormContainer onSubmit={handleLogin}>
            <Popup
                isOpen={popupOpen}
                onClose={() => setPopupOpen(false)}
                title={popupType === 'error' ? 'Erro!' : 'Sucesso!'}
                message={popupMessage}
                type={popupType}
            />

            <S.Colored><span>Audio</span>Share</S.Colored>
            <S.Welcome>Bem vindo!</S.Welcome>
            <S.Form onSubmit={(e) => { e.preventDefault() }}>
                <S.Button type="submit" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Reconhecimento Facial"}
                </S.Button>
            </S.Form>
        </S.FormContainer>

    );
};

export default Form;
