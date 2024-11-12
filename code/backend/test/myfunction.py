import fitz  # PyMuPDF
import spacy

# Função para extrair texto do PDF
def extract_text_from_pdf(pdf_file):
    doc = fitz.open(pdf_file)
    text = ""
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)  # Carrega a página
        text += page.get_text("text")  # Extrai o texto da página
    return text

# Função para identificar nomes no texto usando SpaCy
def extract_names(text):
    # Carregar o modelo de NLP para português
    nlp = spacy.load("pt_core_news_sm")
    
    # Processar o texto
    doc = nlp(text)
    
    # Filtrar entidades do tipo "PERSON"
    names = [ent.text for ent in doc.ents if ent.label_ == 'PER' or ent.label_ == 'PERSON']
    
    return names

# Exemplo de uso
pdf_file = "caminho_raiz_ate_arquivo"

# Extrair o texto do PDF
text = extract_text_from_pdf(pdf_file)

# Extrair os nomes próprios (entidades "PERSON")
names = extract_names(text)

# Exibir os nomes encontrados
print("Nomes encontrados:", names)
