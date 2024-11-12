import React from "react"
import * as S from "./styles"
const Footer = () =>{
    return(
        <S.BackgroundFooter>
            <S.ContentFooter>
                <ul>
                    <a>Copyright © 2024 Bosch Inc.</a>
                    <a href="#"><span>Termos de Serviço</span></a>
                    <a href="#"><span>Política de Privacidade</span></a>
                </ul>
            </S.ContentFooter>
        </S.BackgroundFooter>
    )
}

export default Footer