import React from "react"
import Sidebar from "../../components/global/sidebar"
import Footer from "../../components/global/footer"
import Supergraphic from "../../components/global/header"
import SupportContainer from "../../containers/support/supportContainer"
import LeftContainer from "../../containers/support/leftContainer"
import * as S from "./styles"

const Support = () => {
    return (
        <S.Background>
            <Supergraphic />
            <Sidebar />
            <SupportContainer />
            <Footer />
        </S.Background>
    )
}

export default Support