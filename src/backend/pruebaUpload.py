import pyimgur
from dotenv import load_dotenv
import os
import requests
import webbrowser
load_dotenv()

CLIENT_ID =  os.getenv("IMGUR_CLIENT_ID")
CLIENT_SECRET = os.getenv("IMGUR_CLIENT_SECRET")
access_token = '3e136f90e867cef1893b93d1f7d5a06006b9dd7c'
# Inicializa el cliente de PyImgur
im = pyimgur.Imgur(CLIENT_ID, CLIENT_SECRET, access_token=access_token)

def upload_image(image_path, nombre):        
    try:
        uploaded_image = im.upload_image(image_path, title=nombre,description="Tour", album="ImgCollection")
        print(f"Imagen subida con éxito: {uploaded_image.link}")
    except requests.exceptions.JSONDecodeError as e:
        # Imprimir el contenido de la respuesta si falla la decodificación
        print(f"Error de decodificación JSON: {e}")
        print(f"Contenido de la respuesta: {e.doc}")
     
# Función para renovar el access_token
def refresh_access_token():
    global access_token, authorization_code  # Usar tokens globales para actualizarlos
    AUTH_URL = f"https://api.imgur.com/oauth2/authorize?client_id={CLIENT_ID}&response_type=code"
    # Abrir el navegador para la autorización
    webbrowser.open(AUTH_URL)
    # Pide al usuario que introduzca el código de autorización
    authorization_code = input("Introduce el código de autorización que te ha proporcionado Imgur: ")
    token_url = "https://api.imgur.com/oauth2/token"
    data = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'code': authorization_code
    }
    response = requests.post(token_url, data=data)
    new_tokens = response.json()

    access_token = new_tokens['access_token']
    
# Ruta de la imagen que deseas subir
image_path = r"C:\Users\Walter\Documents\IIS2024\Diseño Software\ProyectoIII\TestProyecto\src\assets\volcan.mp4"
upload_image(image_path,"Logo Hills")