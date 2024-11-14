import React, { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { ProcessData } from '../../api/ata_api';
import * as S from './styles';
import Popup from "../global/popup/index";
import HistoryForm from '../history/index'; // Importe o HistoryForm
import { form } from '../../api/login_api';

const ImportForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');
  const [files, setFiles] = useState({
    ata: null,
    audio: null,
  });

  const [namesList, setNamesList] = useState([]);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(files.ata, files.audio);
      const response = await form(files.ata, files.audio);

      if (response.status === 200) {
        // Atualiza corretamente os dados do namesList
        setNamesList(response.data.calls);
        setFiles({ ata: null, audio: null });
        setPopupMessage("Dados enviados com sucesso! Verifique o histórico para visualizar o log.");
        setPopupType("success");
        setPopupOpen(true);
      } else {
        throw new Error("Erro ao processar os dados");
      }
    } catch (error) {
      setPopupMessage('Um erro ocorreu no processamento dos dados.');
      setPopupType('error');
      setPopupOpen(true);
    } finally {
      setIsLoading(false);
    }
  };


  const planilhas = [
    { name: "ata", label: "Ata", accept: '.pdf' },
    { name: "audio", label: "Pasta de Áudios", accept: '.zip' },
  ];

  // Passa os dados para o HistoryForm
  const uploadData = { namesList };

  return (
    <S.Container>
      <S.PopupWrapper>
        <Popup
          isOpen={popupOpen}
          onClose={() => setPopupOpen(false)}
          title={popupType === 'error' ? 'Erro!' : 'Sucesso!'}
          message={popupMessage}
          type={popupType}
          footer={popupType}
        />
      </S.PopupWrapper>

      <S.Title>Upload de Arquivos</S.Title>

      <S.FormWrapper>
        <S.FormContainer>
          <S.Form onSubmit={handleSubmit}>
            {planilhas.map((planilha, index) => (
              <S.FormGroup key={index}>
                <S.Input
                  type="file"
                  name={planilha.name}
                  id={planilha.name}
                  onChange={handleFileChange}
                  accept={planilha.accept}
                />
                <S.FilePlaceholder
                  htmlFor={planilha.name}
                  className={files[planilha.name] ? 'filled' : ''}
                >
                  <FaFileAlt style={{ marginRight: '8px', color: '#05A6CB' }} />
                  {files[planilha.name] ? files[planilha.name].name : planilha.label}
                </S.FilePlaceholder>
              </S.FormGroup>
            ))}
            <S.Button type="submit" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar Dados"}
            </S.Button>
          </S.Form>
        </S.FormContainer>

        <HistoryForm namesList={namesList} />
      </S.FormWrapper>
    </S.Container>
  );
};

export default ImportForm;
