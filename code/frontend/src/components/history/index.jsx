import * as S from './styles';

const HistoryForm = ({ namesList }) => {
  return (
    <S.HistoryContainer>
      <S.HistoryTitle>Dados Extraídos</S.HistoryTitle>
      <S.NameList>
        {namesList.length === 0 ? (
          <p>Nenhum histórico de upload encontrado.</p>
        ) : (
          <>
            <S.NameList>
              <S.HeaderTable>
                <S.TableRow>
                    <S.TableCell>Atendente</S.TableCell>
                    <S.TableCell>Pagamento</S.TableCell>
                    <S.TableCell>Realizado</S.TableCell>
                    <S.TableCell>Nome audio</S.TableCell>
                    <S.TableCell>Nome ata</S.TableCell>
                </S.TableRow>
              </S.HeaderTable>
              {namesList.map((item, index) => (
                <S.NameItem key={index}>
                  <S.TableRow>
                      <S.TableCell>{item.nome}</S.TableCell>
                      <S.TableCell>{item.metodo_de_pagamento}</S.TableCell>
                      <S.TableCell>{item.finalizada}</S.TableCell>
                      <S.TableCell>{item.audio}</S.TableCell>
                      <S.TableCell>{item.ATA}</S.TableCell>
                  </S.TableRow>
                </S.NameItem>
              ))}
            </S.NameList>
          </>
        )}
      </S.NameList>
    </S.HistoryContainer>
  );
};

export default HistoryForm;
