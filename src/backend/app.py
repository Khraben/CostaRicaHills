import os
import firebase_admin
from firebase_admin import credentials,firestore
from dotenv import load_dotenv
from fastapi import FastAPI
from models import Tour
# Cargar variables de entorno
load_dotenv()
# Crear un diccionario con las credenciales
credenciales_json = {
    "type": os.getenv("FIREBASE_TYPE"),
    "project_id": os.getenv("FIREBASE_PROJECT_ID"),
    "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
    "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace("\\n", "\n"),  # Reemplazar \n por saltos de línea
    "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
    "client_id": os.getenv("FIREBASE_CLIENT_ID"),
    "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
    "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
    "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_X509_CERT_URL"),
    "universal_domain": os.getenv("FIREBASE_UNIVERSE_DOMAIN")
}

cred = credentials.Certificate(credenciales_json)
firebase_admin.initialize_app(cred)
# Inicializar Firestore
db = firestore.client()

#Esto está en un main mientras se realizan los ajustes necesarios para que funcione
def main():
    # Crear la aplicación FastAPI
    app = FastAPI()

    # ---- Add Methods ----
    @app.post("/tours")
    async def add_tour(tour: Tour):
        try:
            doc_ref = db.collection('tours').document()
            doc_ref.set(tour.dict())
            return {"message": "Tour added successfully"}
        except Exception as e:
            return {"error": str(e)}


    # ---- Get Methods ----
    @app.get("/tours/{tour_id}")
    async def get_tour(tour_id: int):
        try:
            doc_ref = db.collection('tours').document(str(tour_id))
            doc = doc_ref.get()
            if doc.exists:
                return doc.to_dict()
            else:
                return {"error": "Tour not found"}
        except Exception as e:
            return {"error": str(e)}
    

