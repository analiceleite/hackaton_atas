import styled from "styled-components"
import { colors } from '../../../styles/styles';
import breakpoints from "../../../styles/breakpoints";

export const BackgroundForm = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    @media ${breakpoints.bg}{
        width: 80%;
    }
`

export const InputForm = styled.input`
    width: 100%;
    height: 4vh;
    outline: none;
    font-size: 16px;
    padding: 1vh;
    border: solid 1px ${colors.greyLabel};
    color: ${colors.greyTitle};
    margin-bottom: 2vh;


    &:focus{
        border: solid 1px ${colors.lightBlue};
    }

`

export const LabelForm = styled.div`
    color: ${colors.greyTitle};
    font-size: 16px;
`

export const InputMessage = styled.textarea`
    width: 100%;
    height: 12vh;
    outline: none;
    font-size: 16px;
    padding: 1vh;
    border: solid 1px ${colors.greyLabel};
    color: ${colors.greyTitle};
    margin-bottom: 2vh;
    resize: none;

    &:focus{
        border: solid 1px ${colors.lightBlue};
    }
`

export const ButtonSend = styled.button`
    width: 100%;
    height: 6vh;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    background-color: #05A6CB;
    color: white;

    &:hover{
        background-color: #1DB7DB;
    }
`