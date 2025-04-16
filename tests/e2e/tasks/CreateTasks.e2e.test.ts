import request from "supertest";
import app from "../../../src/server";

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
    expect(response.body.message).toBe("Title is required"); // Updated error message
    expect(response.body).toHaveProperty("errorCode");
    expect(response.body.errorCode).toBe("TASK_CREATE_MISSING_TITLE"); // Check for the specific error code
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
    expect(response.body.message).toBe("Description is required"); // Updated error message
    expect(response.body).toHaveProperty("errorCode");
    expect(response.body.errorCode).toBe("TASK_CREATE_MISSING_DESCRIPTION"); // Check for the specific error code
  });
});
