// tests/e2e/tasks/UpdateTask.e2e.test.ts

import request from "supertest";
import app from "../../../src/server";
import { CreateTaskDTO } from "../../../src/tasks/application/dtos/CreateTaskDTO";
import { UpdateTaskDTO } from "../../../src/tasks/application/dtos/UpdateTaskDTO";
import { TaskStatus } from "../../../src/tasks/domain/enums/TaskStatus";

describe("PUT /api/tasks/:id", () => {
  let createdTaskId: string;

  // Helper function to create a single task and return its ID
  const createTask = async (taskData: CreateTaskDTO): Promise<string> => {
    const response = await request(app)
      .post("/api/tasks")
      .send(taskData)
      .expect(201);
    return response.body.id;
  };

  beforeEach(async () => {
    // Create a task before each test to ensure there's something to update
    createdTaskId = await createTask({
      title: "Initial Task Title",
      description: "Initial Task Description",
    });
  });

  it("should return 404 Not Found if trying to update a non-existent task", async () => {
    const nonExistentTaskId = "non-existent-uuid";
    const updatePayload: UpdateTaskDTO = {
      id: nonExistentTaskId, // Include ID in the payload
      title: "Attempted Update",
    };

    const response = await request(app)
      .put(`/api/tasks/${nonExistentTaskId}`)
      .send(updatePayload)
      .expect(404);

    expect(response.body).toHaveProperty("message", "TASK_NOT_FOUND");
  });

  it("should return 400 Bad Request if the request body is empty (no data to update)", async () => {
    const emptyPayload = { id: createdTaskId }; // Include ID even with no other data

    const response = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .send(emptyPayload)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "No data provided for update"
    ); // Adjust based on your controller's error message
    expect(response.body).toHaveProperty("errorCode", "TASK_UPDATE_NO_DATA");
  });

  it("should return 400 Bad Request if the title is not a string", async () => {
    const invalidPayload: UpdateTaskDTO = {
      id: createdTaskId,
      title: 123 as any,
    }; // Include ID and invalid title

    const response = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .send(invalidPayload)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Task title must be a string"
    );
    expect(response.body).toHaveProperty(
      "errorCode",
      "TASK_UPDATE_INVALID_TITLE"
    );
  });

  it("should return 400 Bad Request if the description is not a string", async () => {
    const invalidPayload: UpdateTaskDTO = {
      id: createdTaskId,
      description: true as any,
    };

    const response = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .send(invalidPayload)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      "Task description must be a string"
    );
    expect(response.body).toHaveProperty(
      "errorCode",
      "TASK_UPDATE_INVALID_DESCRIPTION"
    );
  });

  it("should return 400 Bad Request if the status is not a valid TaskStatus", async () => {
    const invalidPayload: UpdateTaskDTO = {
      id: createdTaskId,
      status: "INVALID_STATUS" as any,
    };

    const response = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .send(invalidPayload)
      .expect(400);

    expect(response.body).toHaveProperty(
      "message",
      `Task status must be one of: ${Object.values(TaskStatus).join(", ")}`
    );
    expect(response.body).toHaveProperty(
      "errorCode",
      "TASK_UPDATE_INVALID_STATUS"
    );
  });
});
