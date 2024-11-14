from io import BytesIO
import json
import re
import zipfile
import PyPDF2
import google.generativeai as genai
from dotenv import load_dotenv
from pydub import AudioSegment
import speech_recognition as sr
import soundfile as sf
import os

load_dotenv(dotenv_path='.env.dev')

api_key_gemini = os.getenv('API_GEMINI')

# api_key_speak_to_text = os.getenv('API_SPEAK_TO_TEXT')

genai.configure(api_key=api_key_gemini)

def extrair_texto_pdf(request, pdf_file):
    try:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() or ""
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None

def retornar_lista_nomes(pdf_text):
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = (
        f"In Portuguese, make a dictionary in Python format with all the names of people mentioned "
        f"and analyze the text to say if the feedback is positive, negative, or neutral, for each person. "
        f"Return only the dictionary with no comments. Example: Paulo: [positive], Laura: [neutral], Amanda: [negative].\n\n{pdf_text}"
    )
    response = model.generate_content(prompt)
    print(response.text)
    return tratar_lista_nome(response.text)

def tratar_lista_nome(text):
    try:
        # Tentar converter a resposta em um dicionário válido
        start = text.find("{")
        end = text.rfind("}") + 1
        dict_str = text[start:end]
        
        nome_feedback_dict = json.loads(dict_str)
        
        # Certificando que é um dicionário
        if isinstance(nome_feedback_dict, dict):
            return nome_feedback_dict
        else:
            return {}
    
    except Exception as e:
        print(f"Erro ao processar a resposta: {e}")
        return {}

def extrair_arquivos_zip(request, zip_file, save_path='path/audios/raw'):
    with zipfile.ZipFile(BytesIO(zip_file.read())) as zf:
        extracted_files = []

        if not os.path.exists(save_path):
            os.makedirs(save_path)

        for file_name in zf.namelist():
            # Se o arquivo não for um diretório (diretórios terminam com '/')
            if not file_name.endswith('/'):
                extracted_path = os.path.join(save_path, file_name)  # Caminho completo do arquivo

                # Salva o arquivo extraído localmente
                with open(extracted_path, 'wb') as f:
                    f.write(zf.read(file_name))  # Lê o conteúdo do arquivo no ZIP e escreve no arquivo local

                extracted_files.append(extracted_path)  # Adiciona o caminho do arquivo extraído à lista

        return extracted_files

def convert_audio(audio_file, save_path='path/audios/waves/'):
    if not os.path.exists(save_path):
            os.makedirs(save_path)
    
    print(f"Iniciando conversão de: {audio_file}")

    try:
        # Cria a pasta de destino se não existir
        if not os.path.exists(save_path):
            os.makedirs(save_path)

        # Lê o áudio original (exemplo: MP3 ou outro formato suportado)
        audio_data, samplerate = sf.read(audio_file)
        base_name = os.path.basename(audio_file)
        output_path = os.path.join(save_path, os.path.splitext(base_name)[0] + '.wav')  # Define o caminho de saída

        # Salva o áudio convertido para o formato WAV
        sf.write(output_path, audio_data, samplerate, format='WAV')  
        print(f"Áudio convertido e salvo em: {output_path}")

        return output_path
    except Exception as e:
        print(f"Erro na conversão do áudio {audio_file}: {e}")
        return None

def transpose_audio_for_text(audio_file):
    print("afdashgfagsdhas")
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(audio_file) as source:
            audio_data = recognizer.record(source)
        transcription = recognizer.recognize_google(audio_data, language="pt-BR")
        print(transcription)
        return transcription
    except sr.UnknownValueError:
        return 'Não foi possível entender o áudio.'
    except sr.RequestError as e:
        return f'Erro no serviço de reconhecimento de voz: {e}'

    # Salva temporariamente o arquivo de áudio para enviar ao Azure
    temp_audio_path = '/tmp/temp_audio.wav'
    with open(temp_audio_path, 'wb') as f:
        f.write(audio_file.read())

    speech_config = speechsdk.SpeechConfig(
        subscription="a4e4f56892dd4c78bd760a1f3f316c8d",
        region="eastus"
    )
    audio_input = speechsdk.audio.AudioConfig(filename=temp_audio_path)
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_input)

    # Executa a transcrição
    result = speech_recognizer.recognize_once()

    # Apaga o arquivo temporário após a transcrição
    os.remove(temp_audio_path)

    purchase_has_been_completed = json_data['compra_executada']
    payment_method = json_data['metodo_pagamento']
    return purchase_has_been_completed, payment_method
