import React from "react"
import * as S from "./styles"
import Couple from "../../../components/support/imageCouple"
import TextSubtitle from "../../../components/support/textRight"

const RightContainer = () =>{
    return(
        <S.BackgroundRight>
            <Couple/>
            <TextSubtitle/>
        </S.BackgroundRight>
    )
}

export default RightContainer