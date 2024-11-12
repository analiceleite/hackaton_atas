import React from "react";
import * as S from "./styles"

const TextSubtitle = () =>{
    return(
        <S.ContainerText>
            <h1>Sobre o Sistema</h1>
            <p>Este software utiliza Inteligência Artificial para analisar automaticamente áudios de atendimentos referenciados em atas de reunião do setor de CX da Bosch. Ele identifica e extrai nomes mencionados durante os atendimentos e avalia a qualidade de cada interação, classificando-as como positivas ou negativas.</p>
        </S.ContainerText>
    )
}

export default TextSubtitle