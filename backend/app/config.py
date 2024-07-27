import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:0000@localhost/arenasync'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY =  os.urandom(24) # Generates a random secret key
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hour
    JWT_REFRESH_TOKEN_EXPIRES = 86400  # 1 day
