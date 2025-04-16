## 🧪 Prueba Técnica: **API para Gestión de Tareas**

### 🎯 Objetivo:

Construir una API RESTful básica en Node.js para gestionar tareas (To-Do list). El sistema debe permitir crear, listar, actualizar y eliminar tareas. Además, debe soportar filtrado por estado y fecha de creación.

### 📋 Requisitos funcionales

1. **Crear tarea**

   - `POST /tasks`
   - Cuerpo: `{ title: string, description?: string }`
   - Respuesta: tarea creada con ID, estado `"pending"` por defecto, y fecha de creación.

2. **Listar tareas**

   - `GET /tasks`
   - Soporta filtros opcionales:
     - `status=pending|completed`
     - `createdBefore=YYYY-MM-DD`
     - `createdAfter=YYYY-MM-DD`

3. **Actualizar tarea**

   - `PUT /tasks/:id`
   - Permite cambiar título, descripción o estado.

4. **Eliminar tarea**
   - `DELETE /tasks/:id`

---

### 🛠️ Requisitos técnicos

- Usa **Node.js** con **Express**.
- Persistencia en **archivo JSON local** o **in-memory**.
- No se necesita base de datos.
- Código organizado con **Clean Architecture** o separación por capas (routes, services, models).
- Manejo de errores claro.
- Validaciones básicas (por ejemplo, no permitir título vacío).
- Incluir una colección de Postman o instrucciones para probar la API.

---

### 🚀 Extra (no obligatorio, pero suma puntos)

- Escribir pruebas unitarias con Jest o similar.
- Usar TypeScript.
- Implementar paginación.
- Documentar con Swagger o similar.

---

### 📦 Entrega

- Sube el código a un repositorio público (GitHub, GitLab).
- Incluye un `README.md` con:
  - Cómo correr el proyecto.
  - Cómo probar la API.
  - Notas sobre decisiones técnicas tomadas.

---
