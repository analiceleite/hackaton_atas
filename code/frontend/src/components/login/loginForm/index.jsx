import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Popup from "../../global/popup";
import { login } from "../../../api/login_api";
import * as S from '../styles';

const Form = () => {
    //* Popup Settings 
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('');

    //* Fields state
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const data = await login();
            console.log(data)
            if (data.face_detected) {
                localStorage.setItem('user_token', data.face_detected);
                navigate('/import');
            } else {
                console.error("Tokens não recebidos na resposta do login.");
            }
        } catch (error) {
            setPopupMessage('Um erro ocorreu. Credenciais incorretas.');
            setPopupType('error');
            setPopupOpen(true);
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
