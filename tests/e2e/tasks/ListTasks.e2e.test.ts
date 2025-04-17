import request from "supertest";
import app from "../../../src/server";
import { CreateTaskDTO } from "../../../src/tasks/application/dtos/CreateTaskDTO";

describe("GET /api/tasks", () => {
  let createdTaskIds: string[] = [];

  // Helper function to create tasks for testing filters
  const createTestTasks = async (tasks: CreateTaskDTO[]): Promise<string[]> => {
    const ids: string[] = [];
    for (const taskData of tasks) {
      const response = await request(app).post("/api/tasks").send(taskData);
      expect(response.status).toBe(201); // Assuming your POST returns 201 on success
      ids.push(response.body.id);
    }
    return ids;
  };

  const deleteTasks = async (taskIds: string[]) => {
    for (const taskId of taskIds) {
      await request(app).delete(`/api/tasks/${taskId}`);
    }
  };

  beforeEach(async () => {
    if (createdTaskIds.length > 0) {
      await deleteTasks(createdTaskIds);
      createdTaskIds = [];
    }

    // Create tasks and store their IDs
    const tasksToCreate: CreateTaskDTO[] = [
      {
        title: "Task 1",
        description: "Description 1",
      },
      {
        title: "Task 2",
        description: "Description 2",
      },
      {
        title: "Task 3",
        description: "Another Description",
      },
      {
        title: "A Different Task",
        description: "Description 4",
      },
    ];
    createdTaskIds = await createTestTasks(tasksToCreate);
  });

  afterEach(async () => {
    // Clean up the created tasks after each test
    if (createdTaskIds.length > 0) {
      await deleteTasks(createdTaskIds);
      createdTaskIds = [];
    }
  });

  it("should return a list of tasks", async () => {
    const response = await request(app).get("/api/tasks").expect(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("title");
      expect(response.body[0]).toHaveProperty("description");
      expect(response.body[0]).toHaveProperty("status");
      expect(response.body[0]).toHaveProperty("createdAt");
    }
  });

  it("should return an empty list when no tasks are present", async () => {
    // Clear all tasks first
    await deleteTasks(createdTaskIds);
    createdTaskIds = [];

    const response = await request(app).get("/api/tasks").expect(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(0);
  });

  it("should return tasks filtered by status", async () => {
    // Assuming some tasks are created with a default status (e.g., PENDING)
    const response = await request(app)
      .get("/api/tasks?status=PENDING")
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    response.body.forEach((task: any) => {
      expect(task.status).toBe("PENDING");
    });
  });

  it("should return tasks filtered by createdBefore", async () => {
    const response = await request(app)
      .get("/api/tasks?createdBefore=2026-01-01")
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(4);
    response.body.forEach((task: any) => {
      const taskCreatedAt = new Date(task.createdAt);
      const filterDate = new Date("2026-01-01");
      expect(taskCreatedAt <= filterDate).toBe(true);
    });
  });

  it("should return tasks filtered by createdAfter", async () => {
    const response = await request(app)
      .get("/api/tasks?createdAfter=2023-01-01")
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(4);
    response.body.forEach((task: any) => {
      const taskCreatedAt = new Date(task.createdAt);
      const filterDate = new Date("2023-01-01");
      expect(taskCreatedAt >= filterDate).toBe(true);
    });
  });

  it("should return tasks filtered by createdBefore and createdAfter", async () => {
    const response = await request(app)
      .get("/api/tasks?createdBefore=2026-01-02&createdAfter=2025-01-01")
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(4);
    response.body.forEach((task: any) => {
      const taskCreatedAt = new Date(task.createdAt);
      const beforeDate = new Date("2026-01-02");
      const afterDate = new Date("2025-01-01");
      expect(taskCreatedAt <= beforeDate && taskCreatedAt >= afterDate).toBe(
        true
      );
    });
  });
});
