import request from "supertest";
import app from "../../../src/server"; // Adjust the import path as needed
import { ITask } from "../../../src/tasks/domain/entities/ITaks"; // Adjust the import path as needed

describe("POST /api/tasks", () => {
  it("should create a new task and return 201 with the created task", async () => {
    const createTaskDto = {
      title: "Test Task",
      description: "This is a test description",
    };

    const response = await request(app)
      .post("/api/tasks")
      .send(createTaskDto)
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(createTaskDto.title);
    expect(response.body.description).toBe(createTaskDto.description);
    expect(response.body.status).toBe("PENDING");
    expect(response.body).toHaveProperty("createdAt");
  });

  it("should return 400 if title is missing", async () => {
    const createTaskDto = {
      description: "This is a test description",
    };

    const response = await request(app)
      .post("/api/tasks")
      .send(createTaskDto)
      .expect(400);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Title and description are required"); // Ensure the error message matches your use case
  });

  it("should return 400 if description is missing", async () => {
    const createTaskDto = {
      title: "Test Task",
    };

    const response = await request(app)
      .post("/api/tasks")
      .send(createTaskDto)
      .expect(400);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Title and description are required"); // Ensure the error message matches your use case
  });
});
