import React, { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa'; 
import * as S from './styles'; 

const ImportForm = () => {
  const [files, setFiles] = useState({
    planilhaFinal: null,
    dependentes: null,
    ferias: null,
    horaExtra: null,
    planoReclassi: null,
    sindicatos: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const date = new Date().toLocaleString();

    for (const key in files) {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    }

    // Simular o salvamento no localstorage
    const history = JSON.parse(localStorage.getItem('uploadHistory')) || [];
    const newEntry = {
      date,
      files: Object.keys(files).map(key => (
        files[key] ? { name: key, fileName: files[key].name } : null
      )).filter(file => file !== null) // Filtra arquivos nulos
    };

    localStorage.setItem('uploadHistory', JSON.stringify([...history, newEntry]));

    alert('Arquivos enviados com sucesso!');
  };

  const planilhas = [
    { name: "ata", label: "Ata" },
    { name: "audio", label: "Pasta de Áudios" },
  ];

  return (
    <S.FormContainer>
      <S.Title>Upload de Dados</S.Title>
      <S.Form onSubmit={handleSubmit}>
        {planilhas.map((planilha, index) => (
          <S.FormGroup key={index}>
            <S.Input
              type="file"
              name={planilha.name}
              id={planilha.name}
              onChange={handleFileChange}
              accept=".xlsx"
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
        <S.Button type="submit">Enviar Dados</S.Button>
      </S.Form>
    </S.FormContainer>
  );
};

export default ImportForm;
