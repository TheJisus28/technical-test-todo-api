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
- Consider adding authentication and authorization for API access.
- Explore database integration (e.g., PostgreSQL, MongoDB) for persistent storage.
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
- Jest was used for unit testing (`npm test`, `npm run test:unit`) and end-to-end testing (`npm run test:e2e`).
- Supertest was used for end-to-end testing.
- Swagger was used for API documentation, configured via a `swagger.yaml` file.
- Environment variables were managed using a `.env` file and the `dotenv` library.
- Clean Architecture was implemented to separate concerns and reduce coupling, organizing the project into layers: Application, Domain, Infrastructure, and Presentation. All layers communicate through interfaces to ensure low coupling between them.
- In-memory repository (`InMemoryTaskRepository`) was used for data persistence during development.
- The project is built and packaged using `pkgroll`.
- Development server with hot-reloading is provided by `tsx`.

## Scripts

- `dev`: Runs the development server with hot-reloading using `tsx --watch src/index.ts`.
- `build`: Builds the project using `pkgroll`.
- `start`: Starts the built application using `node dist/index.mjs`.
- `test`: Runs all Jest tests (`jest --verbose`).
- `test:unit`: Runs only unit tests located in the `tests/unit` directory (`jest tests/unit --verbose`).
- `test:e2e`: Runs only end-to-end tests located in the `tests/e2e` directory (`jest tests/e2e --verbose`).

## Dependencies

- **Core:** `express`, `uuid`
- **Configuration:** `dotenv`
- **Documentation:** `swagger-ui-express`, `js-yaml`

## Dev Dependencies

- **TypeScript:** `typescript`, `@types/node`, `@types/express`, `@types/uuid`
- **Testing:** `jest`, `@types/jest`, `supertest`, `@types/supertest`, `ts-jest`
- **Build & Development:** `pkgroll`, `tsx`, `ts-node`

## Author

Jesus Carrascal
