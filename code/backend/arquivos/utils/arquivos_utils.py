from io import BytesIO
import json
import re
import zipfile
import PyPDF2
import google.generativeai as genai

genai.configure(api_key="AIzaSyBxZBIadZJtaEmkRF5EqkEut2txkQQvLS8")

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
    
