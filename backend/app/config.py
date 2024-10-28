import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    POSTGRES_USER = os.getenv('POSTGRES_USER')
    POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
    DATABASE_NAME = os.getenv('DATABASE_NAME')
    POSTGRES_HOST = os.getenv('POSTGRES_HOST')

    SQLALCHEMY_DATABASE_URI = f'postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}/{DATABASE_NAME}'

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY =  os.urandom(24) # Generates a random secret key
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hour
    JWT_REFRESH_TOKEN_EXPIRES = 86400  # 1 day

    # Neo4j Configuration
    NEO4J_URI = os.getenv('NEO4J_URI')
    NEO4J_USER = os.getenv('NEO4J_USER')
    NEO4J_PASSWORD = os.getenv('NEO4J_PASSWORD')

    


