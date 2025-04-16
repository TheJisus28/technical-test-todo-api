## 🧪 Technical Test: **Task Management API**

### 🎯 Objective:

Build a basic RESTful API in Node.js for managing tasks (To-Do lists). The system must allow for creating, listing, updating, and deleting tasks. It must also support filtering by status and creation date.

### 📋 Functional Requirements

1. **Create Task**

- `POST /tasks`
- Body: `{ title: string, description?: string }`
- Response: Task created with ID, default `pending` status, and creation date.

2. **List Tasks**

- `GET /tasks`
- Supports optional filters:
- `status=pending|completed`
- `createdBefore=YYYY-MM-DD`
- `createdAfter=YYYY-MM-DD`

3. **Update Task**

- `PUT /tasks/:id`
- Allows you to change the title, description, or status.

4. **Delete Task**

- `DELETE /tasks/:id`

---

### 🛠️ Technical Requirements

- Uses **Node.js** with **Express**.
- Persistence in a **local JSON file** or **in-memory**.
- No database required.
- Code organized with a **Clean Architecture** or layered separation (routes, services, models).
- Clear error handling.
- Basic validations (e.g., not allowing empty titles).
- Include a Postman collection or instructions for testing the API.

---

### 🚀 Extra (not required, but adds points)

- Write unit tests with Jest or similar.
- Use TypeScript.
- Implement pagination.
- Document with Swagger or similar.

---

### 📦 Delivery

- Push the code to a public repository (GitHub, GitLab).
- Include a README.md with:
- How to run the project.
- How to test the API.
- Notes on technical decisions made.

---
