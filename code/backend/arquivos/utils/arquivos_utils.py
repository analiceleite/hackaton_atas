from io import BytesIO
import json
import re
import zipfile
import PyPDF2
import google.generativeai as genai
import google.cloud as audio_to_text
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path='.env.dev')

api_key_gemini = os.getenv('API_GEMINI')

api_key_speak_to_text = os.getenv('API_SPEAK_TO_TEXT')

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
    

def trancrever_audio(request, audio_request):
    cliente = audio_to_text.SpeechClient()

    configuracao = audio_to_text.RecognitionConfig(
        encoding=audio_to_text.RecognitionConfig.AudioEncoding.LINEAR16,  # Tipo de codificação (para WAV)
        sample_rate_hertz=16000,                                   # Taxa de amostragem do áudio
        language_code="pt-BR"                                     # Código de idioma (português brasileiro)
    )

    audio_file = audio_request.FILES.get('audio')
    
    audio = audio_to_text.RecognitionAudio(content=audio_file.read())

    cliente.recognize(config=configuracao, audio=audio)