import styled from "styled-components"
import BoschLogo from "../../../assets/bosch_logo.svg"

export const BackgroundSuper = styled.div`
    position: fixed;

    img {
        top: 0;
        left: 0;
        position: fixed;
    }
`

export const ContentSuper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100vw;
    padding: 8px;
`

export const Logo = styled.div`
    width: 150px;
    height: 50px;
    background-image: url(${BoschLogo});
    background-repeat: no-repeat;
`