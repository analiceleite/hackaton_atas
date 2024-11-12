import React from 'react';
import ReactDOM from 'react-dom';
import * as S from './styles.js';

const Popup = ({ isOpen, onClose, title, message, type }) => {
    if (!isOpen) return null; 

    return ReactDOM.createPortal(
        <S.PopupOverlay onClick={onClose}>
            <S.PopupContent onClick={(e) => e.stopPropagation()}>
                <S.PopupCloseButton onClick={onClose}>×</S.PopupCloseButton>
                {title && <S.PopupTitle>{title}</S.PopupTitle>}
                <S.PopupMessage>{message}</S.PopupMessage>
                {type === 'error' && <S.PopupError>Por favor, tente novamente.</S.PopupError>}
                {type === 'success' && <S.PopupSuccess>Operação realizada com sucesso!</S.PopupSuccess>}
            </S.PopupContent>
        </S.PopupOverlay>,
        document.getElementById('popup-root') 
    );
};

export default Popup;
