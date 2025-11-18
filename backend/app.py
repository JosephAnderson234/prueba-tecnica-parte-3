from flask import Flask, jsonify
from dotenv import load_dotenv

from config import Config
from extensions import db, jwt
from routes.auth import auth_bp
from routes.casos import casos_bp


# Cargar variables de entorno desde .env si existe
load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar extensiones
    db.init_app(app)
    jwt.init_app(app)

    # Crear tablas al inicio
    with app.app_context():
        db.create_all()

    # Rutas simples
    @app.route("/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok"}), 200

    # Registrar blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(casos_bp)

    return app


if __name__ == "__main__":
    # Para entorno de desarrollo
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
