import React from 'react';
import * as S from './styles';

const HistoryForm = ({ uploadData }) => {
  const { namesList, status } = uploadData;

  return (
    <S.HistoryContainer>
      <S.HistoryTitle>Dados Extraídos</S.HistoryTitle>
      {namesList.length === 0 ? (
        <p>Nenhum histórico de upload encontrado.</p>
      ) : (
        <>
          <S.NameList>
            {namesList.map((name, index) => (
              <S.NameItem key={index}>{name}</S.NameItem>
            ))}
          </S.NameList>
          {/* <S.StatusText>Status da chamada: {status}</S.StatusText> */}
        </>
      )}
    </S.HistoryContainer>
  );
};

export default HistoryForm;