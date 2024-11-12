import React from "react"

import Super from "../../../assets/supergraphic.svg"

import * as S from "./styles.js.js"


const Supergraphic = () => {
    return (
        <S.BackgroundSuper>
            <img src={Super}></img>
            <S.ContentSuper>
                <S.Logo></S.Logo>
            </S.ContentSuper>
        </S.BackgroundSuper>
    )
}

export default Supergraphic