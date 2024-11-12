import styled from "styled-components"
import { colors } from '../../../styles/styles';
import breakpoints from "../../../styles/breakpoints";

export const ContainerText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;

    @media ${breakpoints.md}{
        width: 80%;
    }

    @media ${breakpoints.bg}{
        width: 80%;
    }

    &>h1{
        color: ${colors.greyTitle};
        font-size: 24px;
    }

    &>p{
        color: ${colors.greyTitle};
        font-size: 16px;
        text-align: center;
        padding: 2vh;
    }

`