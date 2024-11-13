// import React, { useState } from 'react';
// import ImportForm from './import/index'; // Importando o componente ImportForm corretamente

// const Parent = () => {
//   const [uploadData, setUploadData] = useState(null);

//   // Função que será chamada quando o upload for concluído
//   const handleUploadComplete = (data) => {
//     setUploadData(data); // Armazena os dados do upload
//     console.log('Dados do upload:', data);
//   };

//   return (
//     <div>
//       <h1>Componente Pai</h1>
//       {/* Passa a função handleUploadComplete como uma propriedade para o ImportForm */}
//       <ImportForm onUploadComplete={handleUploadComplete} />
      
//       <div>
//         <h2>Dados do Upload:</h2>
//         {/* Exibe os dados do upload */}
//         <pre>{JSON.stringify(uploadData, null, 2)}</pre>
//       </div>
//     </div>
//   );
// };

// export default Parent;
