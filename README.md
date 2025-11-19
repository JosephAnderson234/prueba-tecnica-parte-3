# 🚀 Proyecto Full Stack: Expedientes

Aplicación full stack con backend en Flask + JWT y frontend en Next.js (App Router) con NextAuth (credenciales). Permite autenticación básica y gestión CRUD de casos.

## 🧱 Estructura
- `backend/`: API Flask (JWT, SQLite, CRUD de casos)
- `next_front/`: Frontend Next.js 16 con NextAuth y React Hook Form

## 🔑 Variables de Entorno
Configura entornos en ambos proyectos (backend y frontend). A continuación se muestran archivos y valores esperados.

### Backend (`backend/.env`)
Requerido por Flask y JWT:
- `JWT_SECRET_KEY`: clave secreta para firmar JWT.
- `APP_USER`: usuario permitido para login (por defecto `admin`).
- `APP_PASSWORD`: contraseña permitida (por defecto `admin123`) Debe ser mayor a 6 caracteres

Contenido de ejemplo:
```
JWT_SECRET_KEY=super-secreto-cambia-esto
APP_USER=admin
APP_PASSWORD=admin123
```

Creación rápida del archivo en PowerShell (Windows):
```powershell
Set-Content -Path backend/.env -Value @"
JWT_SECRET_KEY=super-secreto-cambia-esto
APP_USER=admin
APP_PASSWORD=admin
"@
```

### Frontend (`next_front/.env.local`)
Requerido por Next.js/NextAuth y servicios:
- `NEXT_PUBLIC_API_URL`: URL base del backend. Debe apuntar a Flask. Usa `http://localhost:5000`.
- `NEXTAUTH_SECRET`: secreto usado por NextAuth para firmar tokens de sesión.
- `NEXTAUTH_URL`: URL pública del frontend (en local `http://localhost:3000`).

Contenido de ejemplo:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXTAUTH_SECRET=super-secreto-nextauth-cambia-esto
NEXTAUTH_URL=http://localhost:3000
```

Creación rápida del archivo en PowerShell (Windows):
```powershell
Set-Content -Path next_front/.env.local -Value @"
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXTAUTH_SECRET=super-secreto-nextauth-cambia-esto
NEXTAUTH_URL=http://localhost:3000
"@
```

Generación de secretos (opcional) con Node.js:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🛠️ Requisitos
- Python 3.10+ con `pip`
- Node.js 18+ y `npm`
- PowerShell (Windows)

## ⚙️ Backend (Flask)
Instalación y arranque del servidor API en puerto 5000.
```powershell
# Crear y activar entorno virtual
python -m venv backend/.venv
backend/.venv/Scripts/Activate.ps1

# Instalar dependencias
pip install -r backend/requirements.txt

# Arrancar en desarrollo
python backend/app.py
```
Notas:
- La base de datos SQLite se crea automáticamente (`backend/expedientes.db`).
- Endpoint de salud: `GET http://localhost:5000/health`.
- Login: `POST http://localhost:5000/login`.
- Casos: `GET/POST http://localhost:5000/casos`, `GET/PUT/DELETE http://localhost:5000/casos/{id}`.

## 🖥️ Frontend (Next.js)
Instalación y arranque del cliente en puerto 3000.
```powershell
# Instalar dependencias
cd next_front
npm install

# Arrancar en desarrollo
npm run dev
```
Accede a `http://localhost:3000`.

## 🔐 Autenticación
- Proveedor: NextAuth con credenciales.
- Ruta de login en frontend: `/login`.
- Credenciales por defecto (si no cambiaste el backend):
  - Usuario: `admin`
  - Contraseña: `admin123`
- El frontend consume el backend usando `NEXT_PUBLIC_API_URL`. Asegúrate de que apunte exactamente al puerto/host del backend.

## 🧪 Prueba Rápida
1. Inicia el backend en `http://localhost:5000`.
2. Inicia el frontend en `http://localhost:3000`.
3. Abre el navegador y ve a `/login`.
4. Inicia sesión con las credenciales configuradas.
5. Crea, lista, edita y elimina casos desde el Home y la vista de detalle.

## 🐞 Solución de Problemas
- Errores 404 al autenticar o listar casos:
  - Verifica que `NEXT_PUBLIC_API_URL` sea `http://localhost:5000` (el backend no usa prefijo `/api`).
- Sesión expirada o redirecciones a login:
  - Asegúrate de que la hora del sistema sea correcta.
  - El token expira en 1 hora por configuración del backend.
- No arranca Next.js:
  - Confirma `NEXTAUTH_SECRET` configurado en `next_front/.env.local`.
- Reset de base de datos:
  - Detén el backend, elimina `backend/expedientes.db` y vuelve a iniciar.

## 📦 Scripts útiles
Frontend:
- `npm run dev`: ejecuta servidor de desarrollo Next.js.
- `npm run build`: compila para producción.
- `npm start`: arranca el build compilado.

Backend:
- `python backend/app.py`: ejecuta Flask en modo desarrollo (debug activo).

## 📚 Notas
- El backend crea tablas automáticamente al iniciar.
- El frontend incluye un observador de expiración de JWT que cierra sesión cuando el token caduca.
- Si deseas cambiar puertos, ajusta `NEXT_PUBLIC_API_URL`, `NEXTAUTH_URL` y parámetros de arranque de Flask acorde.
