from pydantic import BaseModel
from typing import List
# Modelos para los Tours
class Destino(BaseModel):
    canton: str
    provincia: str
class Tour(BaseModel):
    nombre: str
    destino: Destino
    descripcion: str
    duracion: str
    precio: str
    imagenes: List[str]