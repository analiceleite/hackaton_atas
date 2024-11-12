import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { Tooltip } from "react-tooltip"; 

import { logout } from "../../../api/login_api"; 
import * as S from "./styles";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await logout();

        if (result.success) {
            navigate('/');
        } else {
            alert(result.message || "Erro ao fazer logout.");
        }
    };

    return (
        <S.ContentSidebar>
            <S.Nav>
                <ul>
                    <li>
                        <Link to="/import" data-tooltip-id="export-tooltip">
                            <S.ExportIcon />
                        </Link>
                        <Tooltip id="export-tooltip" place="right" content="Importar" />
                    </li>
                    <li>
                        <Link to="#" data-tooltip-id="historico-tooltip">
                            <S.HistoricoIcon />
                        </Link>
                        <Tooltip id="historico-tooltip" place="right" content="Listagem" />
                    </li>
                    <li>
                        <Link to="/support" data-tooltip-id="support-tooltip">
                            <S.SupportIcon />
                        </Link>
                        <Tooltip id="support-tooltip" place="right" content="Suporte" />
                    </li>
                </ul>
                <Link to="/" data-tooltip-id="logout-tooltip" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                    <S.LogoutIcon />
                </Link>
                <Tooltip id="logout-tooltip" place="right" content="Sair" />
            </S.Nav>
        </S.ContentSidebar>
    );
};

export default Sidebar;
