# 🚀 ClientFlow — Mini CRM de Clientes

Sistema web para gestionar clientes, proyectos y tareas.
Construido con **React + NestJS + Prisma + PostgreSQL**.

Ideal como proyecto de portafolio fullstack.

---

## ✨ Funcionalidades

* 🔐 Autenticación con JWT (registro y login)
* 👤 Gestión de usuarios
* 🧑‍💼 CRUD de clientes
* 📁 CRUD de proyectos
* ✅ CRUD de tareas
* 🔗 Relaciones entre clientes → proyectos → tareas
* 🌐 API REST con NestJS
* ⚡ Frontend con React + Vite

---


## 🛠 Cómo correr localmente

### 🔹 Backend

```bash
cd backend
npm install
npm run start:dev
```

Backend corre en:

```
http://localhost:3000
```

---

### 🔹 Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend corre en:

```
http://localhost:5173
```

---

## ⚙️ Variables de entorno

Crear archivo `.env` en backend:

```env
DATABASE_URL=postgresql://postgres:TU_PASSWORD@localhost:5432/clientflow_db
JWT_SECRET=supersecret
```

---

## 🧠 Tecnologías

| Tecnología   | Uso           |
| ------------ | ------------- |
| React + Vite | Frontend      |
| TypeScript   | Tipado        |
| NestJS       | Backend API   |
| Prisma       | ORM           |
| PostgreSQL   | Base de datos |
| JWT          | Autenticación |

---

## 📁 Estructura

```
clientflow/
│
├── backend/
│   ├── src/
│   ├── prisma/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│
└── README.md
```

---

## 📸 Screenshots

👉 (agrega aquí imágenes del login y dashboard)

---

## 👨‍💻 Autor

Nicolás Vicente Ortiz
GitHub: https://github.com/Nickdead216

---
