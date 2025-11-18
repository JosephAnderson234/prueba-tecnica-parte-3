import os
from datetime import timedelta

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "expedientes.db")


class Config:
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{DB_PATH}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "cambia-esta-clave-en-produccion")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
