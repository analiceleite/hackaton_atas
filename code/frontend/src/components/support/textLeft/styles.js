import styled from "styled-components"
import Download from "../../../assets/download.svg"
import DownloadHover from "../../../assets/download_hover.svg"
import breakpoints from "../../../styles/breakpoints"

export const ContainerText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 20vh;
    
    @media ${breakpoints.bg}{
        width: 80%;
    }

    &>a {
        display: flex;
        align-items:center;
        text-decoration: none;
        color: #1DB7DB;
    }

    &>h1{
        color: rgba(60, 55, 71, 0.8);
        font-size: 24px;

        &>span{
            cursor: pointer;
            display: flex;
            flex-direction: row;
            justify-content: center;
            font-size: 18px;
            color: #05A6CB;
            margin-top: 1vh;

            &:hover{
                color: #1DB7DB;
            }
        }
    }

    &>p{
        color: rgba(60, 55, 71, 0.8);
        font-size: 16px;
        text-align: center;
        padding: 2vh;
    }
`

export const IconDownload = styled.div`
    width: 25px;
    height: 25px;
    background-image: url(${Download});
    margin-right: 0.5vh;

    background-repeat: no-repeat;
    &:hover{
                background-image: url(${DownloadHover})
            }
`