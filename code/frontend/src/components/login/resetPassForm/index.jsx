import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { redefinePassword } from "../../../api/login_api";
import Popup from "../../global/popup";

import * as S from '../styles';

const Form = () => {
    //* Password visibility functions
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    //* Fields state
    const { uid, token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('');

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        function isPasswordStrong(password) {
            const minLength = 8; // Defina o comprimento mínimo da senha
            const hasUppercase = /[A-Z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            return password.length >= minLength && hasUppercase && hasNumber && hasSpecialChar;
        }

        if (!isPasswordStrong(newPassword)) {
            setPopupMessage("A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.");
            setPopupType("error");
            setPopupOpen(true);
            setIsLoading(false);
            return;
        }

        if (newPassword !== passwordConfirm) {
            setPopupMessage("As senhas não coincidem.");
            setPopupType("error");
            setPopupOpen(true);
            setIsLoading(false);
            return;
        }

        try {
            const data = await redefinePassword(uid, token, newPassword);

            setPopupMessage('A senha foi redefinida com sucesso!\nVocê será redirecionado para a tela de login.');
            setPopupType('success');
            setPopupOpen(true);

            setNewPassword('');
            setPasswordConfirm('');

            setTimeout(() => {
                navigate('/');
            }, 4000);

        } catch (error) {
            setPopupMessage('Um erro ocorreu ao solicitar o reset de senha: ' + (error.response?.data?.error || error.message));
            setPopupType('error');
            setPopupOpen(true);

            setNewPassword('');
            setPasswordConfirm('');

        } finally {
            setIsLoading(false);
        }
    };

    const isPasswordStrong = (password) => {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return password.length >= minLength && hasUppercase && hasNumber && hasSpecialChar;
    }

    return (
        <S.FormContainer>
            <Popup
                isOpen={popupOpen}
                onClose={() => setPopupOpen(false)}
                title={popupType === 'error' ? 'Erro!' : 'Sucesso!'}
                message={popupMessage}
                type={popupType}
            />
            <S.Colored><span>Audio</span>Share</S.Colored>
            <S.Welcome>Redefinição de Senha</S.Welcome>

            <S.Form onSubmit={handleResetPassword}>
                <S.FormGroup>
                    <S.Label>Nova Senha:</S.Label>
                    <S.InputWrapper>
                        <S.Input
                            type={passwordVisible ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <S.Icon onClick={togglePasswordVisibility}>
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </S.Icon>
                    </S.InputWrapper>
                </S.FormGroup>
                <S.FormGroup>
                    <S.Label>Confirmar senha:</S.Label>
                    <S.InputWrapper>
                        <S.Input
                            type={confirmPasswordVisible ? "text" : "password"}
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                        />
                        <S.Icon onClick={toggleConfirmPasswordVisibility}>
                            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </S.Icon>
                    </S.InputWrapper>
                </S.FormGroup>
                <S.Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Redefinindo...' : 'Redefinir Senha'}
                </S.Button>
            </S.Form>

        </S.FormContainer>
    );
};

export default Form;
