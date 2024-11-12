import React from "react";
import * as S from "./styles"

const TextTitle = () => {
    return (
        <S.ContainerText>
            <h1>Suporte Técnico</h1>
            <a href="/path/to/file.pdf" download>
                <S.IconDownload /> Dúvidas Frequentes
            </a>
            <p>Envie uma mensagem para o nosso suporte se persistir alguma dúvida.</p>
        </S.ContainerText>
    )
}

export default TextTitle