from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from extensions import db
from models import Caso, ESTADOS_VALIDOS


casos_bp = Blueprint("casos", __name__, url_prefix="/casos")


@casos_bp.route("", methods=["POST"])
@jwt_required()
def crear_caso():
    data = request.get_json() or {}

    nombre = data.get("nombre")
    descripcion = data.get("descripcion")
    estado = data.get("estado", "abierto")

    if not nombre:
        return jsonify({"msg": "El campo 'nombre' es obligatorio"}), 400

    if estado not in ESTADOS_VALIDOS:
        return jsonify({"msg": f"El estado debe ser uno de: {', '.join(ESTADOS_VALIDOS)}"}), 400

    nuevo_caso = Caso(nombre=nombre, descripcion=descripcion, estado=estado)
    db.session.add(nuevo_caso)
    db.session.commit()

    return jsonify(nuevo_caso.to_dict()), 201


@casos_bp.route("", methods=["GET"])
@jwt_required()
def listar_casos():
    casos = Caso.query.all()
    return jsonify([c.to_dict() for c in casos]), 200


@casos_bp.route("/<int:caso_id>", methods=["GET"])
@jwt_required()
def obtener_caso(caso_id):
    caso = Caso.query.get_or_404(caso_id)
    return jsonify(caso.to_dict()), 200


@casos_bp.route("/<int:caso_id>", methods=["PUT", "PATCH"])
@jwt_required()
def actualizar_caso(caso_id):
    caso = Caso.query.get_or_404(caso_id)
    data = request.get_json() or {}

    nombre = data.get("nombre")
    descripcion = data.get("descripcion")
    estado = data.get("estado")

    if estado is not None and estado not in ESTADOS_VALIDOS:
        return jsonify({"msg": f"El estado debe ser uno de: {', '.join(ESTADOS_VALIDOS)}"}), 400

    if nombre is not None:
        caso.nombre = nombre
    if descripcion is not None:
        caso.descripcion = descripcion
    if estado is not None:
        caso.estado = estado

    db.session.commit()
    return jsonify(caso.to_dict()), 200


@casos_bp.route("/<int:caso_id>", methods=["DELETE"])
@jwt_required()
def eliminar_caso(caso_id):
    caso = Caso.query.get_or_404(caso_id)
    db.session.delete(caso)
    db.session.commit()
    return jsonify({"msg": "Caso eliminado"}), 200
