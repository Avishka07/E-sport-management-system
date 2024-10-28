from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from .config import Config
from flask_jwt_extended import JWTManager
from .utils.db import db
from flask_sqlalchemy import SQLAlchemy
from neomodel import config 
# from .utils.neo4j_helper import Neo4jHelper
import os

def create_app():
    app = Flask(__name__)
    # CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    CORS(app)

    app.config.from_object(Config)

    neo4j_uri = app.config['NEO4J_URI']
    neo4j_user = app.config['NEO4J_USER']
    neo4j_password = app.config['NEO4J_PASSWORD']
    neo4j_database = os.getenv('NEO4J_DATABASE', 'arenasync')  # Default to 'my_database'
    print(f'bolt://{neo4j_user}:{neo4j_password}@{neo4j_uri}/{neo4j_database}')
    config.DATABASE_URL = f'bolt://{neo4j_user}:{neo4j_password}@{neo4j_uri}/{neo4j_database}'


    # Get the base directory (the directory where __init__.py is located)
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Build the relative path to the 'event_img' folder
    event_img_path = os.path.join(base_dir, '..', 'asserts', 'event_img')
    # Set the path to store uploaded files (event images)
    # app.config['UPLOAD_FOLDER'] = 'D:/GitHub/Other Projects/ArenaSync/backend/asserts/event_img'
    print(event_img_path)
    app.config['UPLOAD_FOLDER'] = event_img_path

    db.init_app(app)

    migrate = Migrate(app, db)

    jwt = JWTManager(app)

    # Load Neo4j credentials from environment
    # neo4j_uri = os.getenv('NEO4J_URI')
    # neo4j_user = os.getenv('NEO4J_USER')
    # neo4j_password = os.getenv('NEO4J_PASSWORD')

    # Initialize Neo4j helper
    # neo4j_helper = Neo4jHelper(neo4j_uri, neo4j_user, neo4j_password)

    with app.app_context():
        from .models.sql_models import Admin, Player, Event, EventRegistration
        db.create_all()  # Create database tables for our data models

        from .routes.user_routes import user_blueprint
        from .routes.admin_routes import admin_blueprint
        from .routes.event_routes import event_blueprint
        from .routes.recommendation_routes import recommendation_blueprint  # Import recommendation routes

        app.register_blueprint(user_blueprint, url_prefix='/user')
        app.register_blueprint(admin_blueprint, url_prefix='/admin')
        app.register_blueprint(event_blueprint, url_prefix='/event')
        app.register_blueprint(recommendation_blueprint, url_prefix='/recommendation')  # Register recommendation blueprint

    # Pass neo4j_helper as a global variable
    # app.neo4j_helper = neo4j_helper
    
    return app
