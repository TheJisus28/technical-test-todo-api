# To-Do API Challenge

This project is a RESTful API for managing tasks (To-Do lists), developed as part of a technical test.

## Current Features

- **Task Management:**
  - `POST /api/tasks`: Creates a new task.
  - `GET /api/tasks`: Lists all tasks with optional filtering by status, creation date, and pagination.
  - `PUT /api/tasks/:id`: Updates an existing task by its ID.
  - `DELETE /api/tasks/:id`: Deletes a task by its ID.
- **Swagger Documentation:**
  - The API documentation is available at `/api-docs`.

## Next Steps

- Implement more advanced filtering and sorting options for task listing.
- Implement proper error handling and standardized error response formats.
- Consider adding authentication and authorization for API access.
- Explore database integration (e.g., PostgreSQL, MongoDB) for persistent storage.
- Implement integration tests to verify interactions between different layers of the application.
- Add request validation using libraries like `express-validator`.
- Implement logging for application monitoring.

## Configuration

1. Clone the repository:

```bash
git clone https://github.com/TheJisus28/technical-test-todo-api.git
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with the necessary environment variables:

```
PORT=3000
```

4. Run the application in development mode:

```bash
npm run dev
```

5. Access the Swagger documentation at `http://localhost:3000/api-docs`.

## Testing

To run the unit tests:

```bash
npm test:unit
```

To run the end-to-end tests

```bash
npm run test:e2e
```

## Technical Decisions

- TypeScript was used to improve maintainability and type safety.
- Express was used to create the RESTful API.
- Jest was used for unit testing and end-to-end testing.
- Supertest was used for end-to-end testing.
- Swagger was used for API documentation.
- A `.env` file was used for environment variables.
- **Clean Architecture was implemented to separate concerns and reduce coupling, organizing the project into layers: Application, Domain, Infrastructure, and Presentation. All layers communicate through interfaces to ensure low coupling between them.**
- A `swagger.yaml` file was used to configure Swagger, and documentation was not used directly in the code.
- In-memory repository (`InMemoryTaskRepository`) was used for data persistence during development.

## Dependencies

- express
- typescript
- jest
- supertest
- swagger-ui-express
- js-yaml
- tsx
- pkgroll
- dotenv

## Author

Jesus Carrascal
