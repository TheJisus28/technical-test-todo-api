# To-Do API Challenge

This project is a RESTful API for managing tasks (To-Do lists), developed as part of a technical test.

## Current Features

- **Test Endpoint:**
- `GET /test`: Returns a test message.
- **Swagger Documentation:**
- The API documentation is available at `/api-docs`.

## Next Steps

- Implement the routes for task management (POST /tasks, GET /tasks, PUT /tasks/:id, DELETE /tasks/:id).
- Implement the data persistence logic (local or in-memory JSON file).
- Add basic validations for input data.
- Write unit tests with Jest.

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
npm test
```

## Technical Decisions

- TypeScript was used to improve maintainability and type safety.
- Express was used to create the RESTful API. - Jest was used for unit testing.
- Swagger was used for API documentation.
- A `.env` file was used for environment variables.
- A layered architecture was used to separate responsibilities.
- A `swagger.yaml` file was used to configure Swagger, and documentation was not used in the code.

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
