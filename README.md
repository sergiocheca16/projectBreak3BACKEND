# 🦷 Clínica Dental - Backend

Este proyecto es un backend desarrollado en Node.js y Express que permite gestionar citas médicas para una clínica dental. Incluye autenticación, registro de usuarios, manejo de roles (cliente y admin), y CRUD de citas.

---

## 🚀 Tecnologías utilizadas

 - Node.js
 - Express
 - MongoDB (Mongoose)
 - JWT para autenticación
 - bcrypt para cifrado de contraseñas
 - dotenv para gestión de variables de entorno
 - cors para habilitar peticiones desde otros orígenes

---

## 📦 Instalación

1. Clona el repositorio
2. npm install
3. Crea un archivo .env con estos datos (PORT, MONGO_URI y JWT_SECRET)
4. npm start para iniciar el servidor

---

## 📚 Estructura del proyecto

.
├── config/               # Configuración de la base de datos
├── controllers/          # Lógica de autenticación y citas
├── middlewares/          # Middleware de autenticación
├── models/               # Modelos de Mongoose: User y Appointment
├── routes/               # Rutas separadas por recurso
├── index.js              # Punto de entrada de la app
└── .env                  # Variables de entorno (no se sube al repo)

---

## 🔐 Autenticación

La app utiliza JWT para autenticar usuarios.
 - Los usuarios pueden registrarse como cliente o admin.
 - El token se envía en los headers como:
     - Authorization: Bearer <token>

---

## 🧾 Endpoints principales

Auth

Método	Ruta	                Descripción
POST	/api/auth/register	    Registrar usuario
POST	/api/auth/login	        Iniciar sesión y obtener token


Citas
Requiere autenticación

Método	Ruta	                Descripción
POST	/api/appointments	    Crear una nueva cita
GET	    /api/appointments	    Listar citas del usuario (admin ve todas)
PUT	    /api/appointments/:id   Actualizar estado y fecha (solo admin)

---

## 👤 Roles

 - cliente: puede crear y ver sus propias citas.
 - admin: puede ver todas las citas y modificar fechas y estados.