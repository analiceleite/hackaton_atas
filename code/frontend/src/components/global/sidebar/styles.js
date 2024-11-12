import styled from "styled-components";

import Logout from "../../../assets/logout.svg"
import Historico from "../../../assets/historico.svg"
import Export from "../../../assets/export.svg"
import Support from "../../../assets/support.svg"
import HistoricoHover from "../../../assets/historico_hover.svg"
import ExportHover from "../../../assets/export_hover.svg"
import SupportHover from "../../../assets/support_hover.svg"
import LogoutHover from "../../../assets/logout_hover.svg"


export const ContentSidebar = styled.div`
    display: flex;
    position: fixed;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
`

export const Nav = styled.div`
    display: grid;
    gap: 6vw;
    padding: 2.7vh;

    &>ul{
        display: grid;
        gap: 2vw;

        &>li{
            display: flex;
            align-items: center;
            cursor: pointer;
        }
    }

`


export const HistoricoIcon = styled.div`
    width: 25px;
    height: 25px;
    background-image: url(${Historico});
    background-repeat: no-repeat;

    &:hover{
        background-image: url(${HistoricoHover});
    }
`

export const ExportIcon = styled.div`
    width: 25px;
    height: 25px;
    background-image: url(${Export});
    background-repeat: no-repeat;

    &:hover{
        background-image: url(${ExportHover});
    }

`
export const SupportIcon = styled.div`
    width: 25px;
    height: 25px;
    background-image: url(${Support});
    background-repeat: no-repeat;

    &:hover{
        background-image: url(${SupportHover});
    }
`
export const LogoutIcon = styled.div`
    width: 25px;
    height: 25px;
    background-image: url(${Logout});
    background-repeat: no-repeat;
    cursor: pointer;
 
    &:hover{
        background-image: url(${LogoutHover});
    }
`