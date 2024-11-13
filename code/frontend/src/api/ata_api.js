import axios from 'axios';
import { API_BASE_URL } from "./base_api";

export const ProcessData = async (ata_file, audio_file) => {
  try {
    const formData = new FormData();
    formData.append("ata_file", ata_file);
    formData.append("audio_file", audio_file);

    const response = await axios.post(`${API_BASE_URL}/api/v1/arquivos/form/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Log the response object to debug
    console.log('Response:', response);

    // Return the response so that the calling function can handle it
    return response;
  } catch (error) {
    console.error("Um erro ocorreu:", error.response?.data || error.message);
    throw error;
  }
};
