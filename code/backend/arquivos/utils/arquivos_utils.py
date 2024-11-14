from io import BytesIO
import json
import re
import zipfile
import PyPDF2
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path='.env.dev')

api_key = os.getenv('API_GEMINI')

genai.configure(api_key=api_key)

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
    prompt = (f"De acordo com o texto seguinte, me retorne o nome dos atendentes mencionados separados por vírgula: {pdf_text}")
    response = model.generate_content(prompt)
    print(f"Nome dos atendentes: {response.text}")
    return tratar_lista_nome(response.text)

# def retornar_lista_feedback(request,lista_nomes):
    
   
def tratar_lista_nome(text):
    nomes_lista = [nome.strip() for nome in text.split(",")]
    return nomes_lista

def extrair_arquivos_zip(request, zip_file):
    with zipfile.ZipFile(BytesIO(zip_file.read())) as zf:
        extracted_files = []
        
        for file_name in zf.namelist():
            
            extracted_path = request.save_file(zf, file_name)
            
            extracted_files.append(file_name)
        
        return extracted_files
    
