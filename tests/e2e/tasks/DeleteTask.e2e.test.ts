import request from "supertest";
import app from "../../../src/server";
import { CreateTaskDTO } from "../../../src/tasks/application/dtos/CreateTaskDTO";

describe("DELETE /api/tasks/:id", () => {
  // Helper function to create a single task and return its ID
  const createTask = async (taskData: CreateTaskDTO): Promise<string> => {
    const response = await request(app)
      .post("/api/tasks")
      .send(taskData)
      .expect(201);
    return response.body.id;
  };

  it("should return 204 No Content if a task is successfully deleted", async () => {
    const taskIdToDelete = await createTask({
      title: "Task to Delete",
      description: "Description for deletion",
    });

    await request(app).delete(`/api/tasks/${taskIdToDelete}`).expect(204);

    // Optionally, verify that the task is no longer retrievable (if you have a GET by ID endpoint)
    await request(app).get(`/api/tasks/${taskIdToDelete}`).expect(404);
  });

  it("should return 404 Not Found if trying to delete a non-existent task", async () => {
    const nonExistentTaskId = "non-existent-uuid";

    // Ensure no task with this ID exists (optional, but good practice for isolation)
    await request(app).get(`/api/tasks/${nonExistentTaskId}`).expect(404); // Assuming your GET by ID returns 404

    const response = await request(app)
      .delete(`/api/tasks/${nonExistentTaskId}`)
      .expect(404);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("TASK_NOT_FOUND"); // Adjust based on your error message
  });
});
