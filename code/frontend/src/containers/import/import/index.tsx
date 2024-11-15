import ImportForm from "../../../components/import/index"
import Supergraphic from "../../../components/global/header"
import Footer from "../../../components/global/footer"
import * as S from './styles'

export const ImportContainer = () => {
    return (
        <>
        <Supergraphic />
        <S.ImportContainer>
            <ImportForm />
        </S.ImportContainer>
        <Footer/>
        </>
    )
}

export default ImportContainer 

