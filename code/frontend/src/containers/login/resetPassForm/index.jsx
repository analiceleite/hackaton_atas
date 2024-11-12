import Form from '../../../components/login/resetPassForm/index.jsx';
import Icon from '../../../assets/bosch_male.png';
import BoschLine from '../../../assets/supergraphic.png';
import Logo from '../../../assets/logo.png';

import * as S from '../styles.js';

const Login = () => {
  return (
    <S.LoginContainer>
      <S.MainContainer>
        <S.BoschLineImg src={BoschLine} alt="Bosch Line" />
        <S.Logo src={Logo} alt="Bosch Logo" />
        <S.Icon src={Icon} alt="Bosch Icon" />
        <Form />
      </S.MainContainer>
    </S.LoginContainer>
  );
};

export default Login;
