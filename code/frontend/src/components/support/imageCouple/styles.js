import styled from "styled-components"
import GayCouple from "../../../assets/male_couple.svg"
import breakpoints from "../../../styles/breakpoints"

export const BackgroundCouple = styled.div`
    width: 60%;
    height: 62vh;

    @media ${breakpoints.md}{
        width: 100%;
    }

    @media ${breakpoints.bg}{
        width: 100%;
    }
`

export const ImageCouple = styled.div`
    background-image: url(${GayCouple});
    background-repeat: no-repeat;
    background-position: 24vh;
    width: 100%;
    height: 75vh;
    
    @media ${breakpoints.bg}{
        background-position: 4vh;
    }
`