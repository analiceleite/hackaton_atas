import styled from "styled-components";
import { colors } from "../../styles/styles";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${colors.lightGray};
`;

export const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 55vw;
  padding: 0px 20px 20px; /* Ajuste de padding para deixar espaço para a linha */
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 2; /* Garante que o MainContainer esteja acima da linha */
`;

export const BoschLineImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 1;
`;

export const Logo = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 85px;
  height: auto;
  z-index: 1;
`

export const Icon = styled.img`
  max-width: 12vw;
  z-index: 2; 
  margin-bottom: 20px;
  margin-top: 35px;
  margin-right: 25px;
`;
