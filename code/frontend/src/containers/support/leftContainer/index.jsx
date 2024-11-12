import React from "react"
import * as S from "./styles"
import TextTitle from "../../../components/support/textLeft"
import FormSupport from "../../../components/support/formSupport"

const LeftContainer = () =>{
    return(
        <S.BackgroundLeft>
            <TextTitle/>
            <FormSupport/>
        </S.BackgroundLeft>
    )
}

export default LeftContainer