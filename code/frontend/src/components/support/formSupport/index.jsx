import React, { useState } from "react";
import * as S from "./styles";
import { support } from "../../../api/support_api";
import Popup from "../../global/popup";

const FormSupport = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('');
    const [edv, setEdv] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSupport = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await support(edv, email, message);
            setPopupMessage('Sucesso ao enviar mensagem! Em breve a equipe de suporte entrará em contato, fique de olho no seu e-mail.');
            setPopupType('success');
            setPopupOpen(true);

            setEdv('');
            setEmail('');
            setMessage('');

        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
            setPopupMessage('Erro de conexão. Verifique sua internet e tente novamente.');
            setPopupType('error');
            setPopupOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <S.BackgroundForm>
            <Popup
                isOpen={popupOpen}
                onClose={() => setPopupOpen(false)}
                title={popupType === 'error' ? 'Erro!' : 'Sucesso!'}
                message={popupMessage}
                type={popupType}
            />
            <S.LabelForm>EDV</S.LabelForm>
            <S.InputForm type="text" value={edv} onChange={(e) => setEdv(e.target.value)} />

            <S.LabelForm>Email</S.LabelForm>
            <S.InputForm type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <S.LabelForm>Mensagem</S.LabelForm>
            <S.InputMessage
                type="text"
                placeholder="Digite sua mensagem aqui..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <S.ButtonSend disabled={isLoading} type="submit" onClick={handleSupport}>
                {isLoading ? "Enviando..." : "Enviar Mensagem"}
            </S.ButtonSend>
        </S.BackgroundForm>
    );
};

export default FormSupport;
