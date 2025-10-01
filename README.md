# 🚀 Register-Coppel-App

Proyecto de prueba técnica implementado con **microservicios en Spring Boot**, **Next.js (frontend)** y **PostgreSQL**, orquestados con **Docker Compose**.

---

## 📂 Estructura del proyecto

Register-Coppel-App/
│── docker-compose.yml
│── .gitignore
│── README.md
│
├── auth-service/           # Microservicio de autenticación (Spring Boot + JWT + PostgreSQL)
│   ├── Dockerfile
│   ├── db/init.sql
│   └── src/...
│
├── customer-service/       # Microservicio de clientes (Spring Boot + PostgreSQL)
│   ├── Dockerfile
│   ├── db/init.sql
│   └── src/...
│
├── gateway-service/        # API Gateway con Spring Cloud Gateway
│   ├── Dockerfile          # Este servicio quedo fuera del proyecto debido a Tiempo
│   └── src/...
│
└── front-app/              # Frontend con Next.js + Bootstrap + React Hook Form + SweetAlert2
    └── register-ui/
        ├── Dockerfile
        ├── public/
        └── src/...

---

## 🔧 Requisitos previos

- Docker Desktop
- Git

---

## ▶️ Levantar el proyecto

Clonar el repositorio:

git clone https://github.com/tu-usuario/Register-Coppel-App.git
cd Register-Coppel-App

Levantar los contenedores con Docker Compose:

docker compose up --build

Esto levantará:

- Frontend → http://localhost:3000  
- Auth-Service → http://localhost:8083  
- Customer-Service → http://localhost:8082  
- Postgres Auth → puerto 5434  
- Postgres Customer → puerto 5433  

---

## 🔑 Flujo de autenticación

usuarios y contraseñas validos:

"username":"legolasblack.lothbrok"
"password":"test12345"

"username":"Admin.Test"
"password":"test12345"

"username":"User.Test"
"password":"test12345"

1. Ingresar usuario y contraseña en el Login (Next.js).  
2. El auth-service valida credenciales y devuelve un JWT.  
3. El frontend guarda el token en localStorage.  
4. El formulario de clientes solo se muestra si existe un token válido.  
5. Todas las peticiones a customer-service incluyen Authorization: Bearer <token>.

---

## 🗄️ Bases de datos

- auth_db: usuarios y roles iniciales (admin, dataentry).
- customers_db: registros de clientes.

Cada servicio tiene un init.sql que se ejecuta automáticamente al crear el contenedor.

---

## 🛠️ Tecnologías utilizadas

- Backend: Spring Boot, Spring Security, JWT, 
- Frontend: Next.js, React, Bootstrap, React Hook Form, SweetAlert2
- Base de datos: PostgreSQL
- Infraestructura: Docker, Docker Compose

---

## 📜 Licencia
Este proyecto es únicamente para fines académicos y de evaluación técnica.
