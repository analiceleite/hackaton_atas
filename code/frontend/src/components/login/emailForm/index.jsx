import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Popup from "../../global/popup";

import * as S from '../styles';
import { checkEmailExists, resetPassword } from "../../../api/login_api";

const Form = () => {

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('');

    const navigate = useNavigate();

    const handleSubmitEmail = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {

            const emailExists = await checkEmailExists(email);

            if (!emailExists) {
                setPopupMessage('O e-mail não foi encontrado.');
                setPopupType('error');
                setPopupOpen(true);
                setIsLoading(false);

                setEmail('');
                return; 
            }

            const data = await resetPassword(email);

            setPopupMessage('Solicitação enviada para o seu e-mail com sucesso. Acesse o link que será disponibilizado por lá e redefina a sua senha.');
            setPopupType('success');
            setPopupOpen(true);

            setEmail('');

        } catch (error) {
            setPopupMessage('Um erro ocorreu ao solicitar o reset de senha: ' + (error.response?.data?.error || error.message));
            setPopupType('error');
            setPopupOpen(true);

            setEmail('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <S.FormContainer onSubmit={handleSubmitEmail}>
            <Popup
                isOpen={popupOpen}
                onClose={() => setPopupOpen(false)}
                title={popupType === 'error' ? 'Erro!' : 'Sucesso!'}
                message={popupMessage}
                type={popupType}
            />
            <S.Colored><span>Audio</span>Share</S.Colored>
            <S.Welcome>Recuperação de Senha</S.Welcome>
            <S.Form>
                <p>Insira o seu e-mail para envio da solicitação:</p>
                <S.FormGroup>
                    <S.Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </S.FormGroup>
                <S.Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Enviar E-mail'}
                </S.Button>
            </S.Form>
        </S.FormContainer>
    );
};

export default Form;
