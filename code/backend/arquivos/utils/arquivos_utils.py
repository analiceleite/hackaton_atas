from io import BytesIO
import json
import re
import zipfile
import PyPDF2
import google.generativeai as genai
from pydub import AudioSegment
from io import BytesIO
import speech_recognition as sr


genai.configure(api_key="AIzaSyCiQYMK4tZBmUadg4Sq-zXBxOcbajn7vaE")

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
    
   
def tratar_lista_nome(text):
    try:
        start = text.find("{")
        end = text.rfind("}") + 1
        dict_str = text[start:end]
       
        nome_feedback_dict = json.loads(dict_str)
   
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
    

def convert_audio(audio_file):
    audio = AudioSegment.from_file(audio_file)
    wav_io = BytesIO()
    audio.export(wav_io, format="wav")
    wav_io.seek(0)
    return wav_io


def transpose_audio_for_text(audio_file):
    recognizer = sr.Recognizer()
   
    try:
        audio_segment = AudioSegment.from_file(audio_file, format="wav")
        wav_audio = BytesIO()
        audio_segment.export(wav_audio, format="wav")
        wav_audio.seek(0)
 
        with sr.AudioFile(wav_audio) as source:
            audio_data = recognizer.record(source)
   
        transcription = recognizer.recognize_google(audio_data, language="pt-BR")
        return transcription
   
    except sr.UnknownValueError:
        return 'Não foi possível entender o áudio.'
    except sr.RequestError as e:
        return f'Erro no serviço de reconhecimento de voz: {e}'
    

def extract_datas_from_audio(msg):
    purchase_has_been_completed = False
    payment_method = ''

    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"""
    Em português, analise a seguinte transcrição de chamada telefônica e identifique o método de pagamento e se a compra foi executada. 
    Responda apenas no formato JSON, sem explicações, apenas o dicionário. 
    Aqui está o texto a ser analisado:
    {msg}
    Resposta apenas em formato JSON:
    """

    response = model.generate_content(prompt)
    start = response.text.find("{")
    end = response.text.rfind("}") + 1
    response_formated = response.text[start:end]

    print(response_formated)
    json_data = json.loads(response_formated)
    print("="*30)
    print(json_data)

    purchase_has_been_completed = json_data['compra_executada']
    payment_method = json_data['metodo_pagamento']
    return purchase_has_been_completed, payment_method
        
    

    
