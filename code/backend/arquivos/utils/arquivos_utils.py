from io import BytesIO
import json
import re
import zipfile
import PyPDF2
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path='.env.dev')

api_key_gemini = os.getenv('API_GEMINI')

# api_key_speak_to_text = os.getenv('API_SPEAK_TO_TEXT')

genai.configure(api_key=api_key_gemini)

def extrair_texto_pdf(request, pdf_file):
        # Usando PyPDF2 para extrair o texto do PDF
        try:
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() or ""  # Em caso de falha na extração, continua
            return text
        except Exception as e:
            print(f"Error reading PDF: {e}")
            return None
        
def retornar_lista_nomes(request, pdf_text):
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = (
        f"In Portuguese, make a dictionary in Python format with all the names of people mentioned "
        f"and analyze the text to say if the feedback is positive, negative, or neutral, for each person. "
        f"Return only the dictionary with no comments. Example: Paulo: [positive], Laura: [neutral], Amanda: [negative].\n\n{pdf_text}"
    )
    response = model.generate_content(prompt)
    print(response.text)
    return tratar_lista_nome(response.text)

# def retornar_lista_feedback(request,lista_nomes):

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

def extrair_arquivos_zip(request, zip_file):
    with zipfile.ZipFile(BytesIO(zip_file.read())) as zf:
        extracted_files = []
        
        for file_name in zf.namelist():
            
            extracted_path = request.save_file(zf, file_name)
            
            extracted_files.append(file_name)
        
        return extracted_files
    
import azure.cognitiveservices.speech as speechsdk

# import google.cloud as speechsdk
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

def trancrever_audio(request, audio_request):

    audio_file = audio_request.FILES.get('audio')

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

    # Verifica o resultado
    if result.reason == speechsdk.ResultReason.RecognizedSpeech:
        transcription = result.text
    elif result.reason == speechsdk.ResultReason.NoMatch:
        transcription = "Nenhuma fala foi reconhecida."
    elif result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = result.cancellation_details
        transcription = f"Transcrição cancelada: {cancellation_details.reason}"
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            transcription += f"\nErro: {cancellation_details.error_details}"

    return Response({"transcription": transcription}, status=status.HTTP_200_OK)