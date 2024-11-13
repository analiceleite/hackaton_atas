import styled from 'styled-components';

// Container for the entire page
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

// Wrapper for Popup to ensure proper layout positioning
export const PopupWrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
`;

// Title styling
export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

// Wrapper for the form and history components
export const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  max-width: 1200px;
  margin-top: 20px;
`;

// Form container for file upload (occupies 30% of the width)
export const FormContainer = styled.div`
  width: 50%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  margin-right: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// History container for the extracted data (on the right)
export const HistoryContainer = styled.div`
  width: 65%;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Form styles
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

export const Input = styled.input`
  display: none;
`;

export const FilePlaceholder = styled.label`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &.filled {
    background-color: #e1f5fe;
  }
`;

export const Button = styled.button`
  padding: 12px 20px;
  background-color: #05A6CB;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
