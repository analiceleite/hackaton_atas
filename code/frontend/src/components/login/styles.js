import styled from "styled-components";
import { colors } from "../../styles/styles";

export const FormContainer = styled.div`
  height: auto;
  max-height: 80vh;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 470px;
`;

export const Colored = styled.h2`
  text-align: center;

  span {
    color: ${colors.lightBlue}
  }
`

export const Welcome = styled.h4`
  text-align: center;
  margin-bottom: 30px;
`

export const Form = styled.form`
    margin-bottom: 30px;
`;

export const FormGroup = styled.div`
  margin: 20px 0px 20px 0px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-left: 3px solid ${colors.lightGray};
  outline: none;
  cursor: pointer;
`;

export const Icon = styled.div`
  position: absolute;
  top: 65%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #1a3a72;
  font-size: 18px;

  &:hover {
    color: #01164d;
  }
`;

export const Button = styled.button`
  padding: 10px;
  width: 100%;
  background-color: ${colors.lightBlue};
  color: ${colors.white};
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: ${colors.darkBlue};
  }
`

export const ForgotPass = styled.a`
  color: ${colors.lightBlue};
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
