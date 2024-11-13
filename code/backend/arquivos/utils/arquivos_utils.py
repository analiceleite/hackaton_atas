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
    prompt = f"In portuguese, make a only array pyhon formart all the names of people mentioned in the following text:\n\n{pdf_text}"
    response = model.generate_content(prompt)
    return tratar_lista_nome(response.text)
    
   
def tratar_lista_nome(text):
    match = re.search(r'\[([^\]]+)\]', text)
    if match:
        nomes_str = match.group(1)
        nomes = [nome.strip().strip('"').lower() for nome in nomes_str.split(',')]
        return nomes
    return []

def extrair_arquivos_zip(request, zip_file):
    with zipfile.ZipFile(BytesIO(zip_file.read())) as zf:
        extracted_files = []
        
        for file_name in zf.namelist():
            
            extracted_path = request.save_file(zf, file_name)
            
            extracted_files.append(file_name)
        
        return extracted_files
    
