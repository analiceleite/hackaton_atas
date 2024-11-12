import styled from 'styled-components';
import { colors } from '../../styles/styles';
import breakpoints from '../../styles/breakpoints';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30vw;

  @media ${breakpoints.bg}{
        width: 50vw;
    }
`;

export const Title = styled.h2`
  color: ${colors.greyTitle};
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  position: relative; 
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  display: none;
`;

export const FilePlaceholder = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: ${colors.greyTitle};
  cursor: pointer;

  &:hover{
    border-color: ${colors.lightBlue}; 
  }

  &.filled {
    border-color: ${colors.lightBlue}; // Cor do borda quando preenchido
    background-color: ${colors.backgroundBlue}; // Fundo claro quando preenchido
  }
`;

export const Button = styled.button`
  background-color: ${colors.lightBlue};
  color: ${colors.white};
  padding: 15px 15px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${colors.darkBlue};
  }
`;
