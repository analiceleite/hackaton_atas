from io import BytesIO
import json
import re
import zipfile
import PyPDF2
import google.generativeai as genai
from pydub import AudioSegment
from io import BytesIO
import speech_recognition as sr
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

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
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")

    response = model.generate_content(f"""
        Gemini, o texto abaixo é referente a uma ata sobre a conversa de gestores quanto ao desempenho nas ligações dos atendentes:

        {pdf_text}

        A tarefa que esperamos que realize é pegar os nomes dos atendentes e retornar APENAS os nomes em formato de lista conforme o exemplo abaixo:

        ["Nome Um", "Nome Dois"]

        Não adicione nenhum texto que não seja esta lista e caso o nome já esteja na lista, não adicionar novamente. No caso de não encontrar nenhum nome, retorne: []

    """)

    response = f"teste{response.text}teste"

    response = re.search(r'\[(.*?)\]', response)

    if response:
        list_names = [item.strip().strip('"') for item in response.group(1).split(',')]
        return list_names
    
    else:
        return []

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

def save_file(file_data, file_name):
    """Salva um arquivo extraído em um diretório temporário e retorna o caminho."""

    # Define o caminho onde o arquivo será salvo
    path = f"temp_files/{file_name}"
    
    # Salva o arquivo no armazenamento padrão do Django
    default_storage.save(path, ContentFile(file_data))
    
    return path

def extrair_arquivos_zip(request, zip_file):
    # Cria uma lista para armazenar os nomes dos arquivos extraídos
    extracted_files = []

    with zipfile.ZipFile(BytesIO(zip_file.read())) as zf:
        for file_name in zf.namelist():
            # Extrai
            file_data = zf.read(file_name)

            # Salva o arquivo
            extracted_path = save_file(file_data, file_name)
            extracted_files.append(extracted_path)

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

        Responda apenas no formato JSON, sem explicações, apenas o dicionário. A forma da qual você irá analisar é a seguinte: primeiro você

        identificará se houve a confirmação da compra. Caso sim, localize a forma de pagamento realizada. Caso não, o texto da forma do pagamento

        deverá ser: 'sem método'.

        Aqui está o texto a ser analisado:
        
        {msg}
        
        Resposta apenas em formato JSON, nesse modelo:

        {{
            "compra_confirmada": "True ou False",
            "metodo_pagamento": "cartão de crédito, débito, boleto, pix, etc, ou 'sem método'"
        }}
    """

    response = model.generate_content(prompt)
    start = response.text.find("{")
    end = response.text.rfind("}") + 1
    response_formated = response.text[start:end]

    print(response_formated)
    json_data = json.loads(response_formated)
    print("="*30)
    print(json_data)

    purchase_has_been_completed = json_data['compra_confirmada']
    payment_method = json_data['metodo_pagamento']
    return purchase_has_been_completed, payment_method