import styled from 'styled-components';

export const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

export const PopupContent = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    position: relative;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const PopupCloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: transparent;
    font-size: 20px;
    cursor: pointer;
    color: #333;
`;

export const PopupTitle = styled.h2`
    margin: 0;
    font-size: 24px;
`;

export const PopupMessage = styled.p`
    font-size: 16px;
    margin: 10px 0;
`;

export const PopupError = styled.p`
    color: red;
`;

export const PopupSuccess = styled.p`
    color: green;
`;
