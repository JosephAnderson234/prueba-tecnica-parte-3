import os

from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token


auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")

    expected_user = os.getenv("APP_USER", "admin")
    expected_pass = os.getenv("APP_PASSWORD", "admin")

    if not username or not password:
        return jsonify({"msg": "Faltan credenciales"}), 400

    if username != expected_user or password != expected_pass:
        return jsonify({"msg": "Credenciales inválidas"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200
