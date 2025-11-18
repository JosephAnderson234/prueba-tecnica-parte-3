from extensions import db


ESTADOS_VALIDOS = ("abierto", "en_progreso", "cerrado")


class Caso(db.Model):
    __tablename__ = "casos"

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    estado = db.Column(db.String(50), nullable=False, default="abierto")

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "estado": self.estado,
        }
