import React, { useEffect, useState } from 'react';
import * as S from './styles';

const HistoryForm = ({ uploadData }) => {
  const { namesList, status } = uploadData;
  const [newNameList, setNewNameList] = useState(
    [
      {
        atendente: "João", 
        pagamento: "Crédito", 
        realizado: false, 
        nomeAudio: "Audio3", 
        nomeAta: "Ata legal",
        status: "Bom",
      }
    ]
  ); 

  return (
    <S.HistoryContainer>
      <S.HistoryTitle>Dados Extraídos</S.HistoryTitle>
      <S.NameList>
      </S.NameList>

      {newNameList.length === 0 ? (
        <p>Nenhum histórico de upload encontrado.</p>
      ) : (
        <>
          <S.NameList>
            <S.HeaderTable>
              <S.TableRow>
                  <S.TableCell>Atendente</S.TableCell>
                  <S.TableCell>Pagamento</S.TableCell>
                  <S.TableCell>Realizado</S.TableCell>
                  <S.TableCell>Status</S.TableCell>
                  <S.TableCell>Id audio</S.TableCell>
                  <S.TableCell>Id ata</S.TableCell>
              </S.TableRow>
            </S.HeaderTable>
            {newNameList.map((item, index) => (
              <S.NameItem key={index}>
                <S.TableRow>
                    <S.TableCell>{item.atendente}</S.TableCell>
                    <S.TableCell>{item.pagamento}</S.TableCell>
                    <S.TableCell>{item.realizado ? "Sim" : "Não"}</S.TableCell>
                    <S.TableCell>{item.status}</S.TableCell>
                    <S.TableCell>{item.nomeAudio}</S.TableCell>
                    <S.TableCell>{item.nomeAta}</S.TableCell>
                </S.TableRow>
              </S.NameItem>
            ))}
          </S.NameList>
        </>
      )}
    </S.HistoryContainer>
  );
};

export default HistoryForm;