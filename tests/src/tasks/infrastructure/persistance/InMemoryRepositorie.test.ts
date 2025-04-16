import InMemoryTaskRepository from "../../../../../src/tasks/infrastructure/persistance/InMemoryRepositorie";
import { ITask } from "../../../../../src/tasks/domain/entities/ITaks";
import { CreateTaskDTO } from "../../../../../src/tasks/application/dtos/CreateTaskDTO";
import { UpdateTaskDTO } from "../../../../../src/tasks/application/dtos/UpdateTaskDTO";
import { Filters } from "../../../../../src/tasks/application/dtos/Filters";
import { TaskStatus } from "../../../../../src/tasks/domain/enums/TaskStatus";

describe("InMemoryTaskRepository", () => {
  let repository: InMemoryTaskRepository;

  beforeEach(() => {
    repository = new InMemoryTaskRepository();
  });

  it("should save a new task", async () => {
    const initialTask: ITask = {
      id: "1",
      title: "Test Task",
      description: "This is a test task",
      status: TaskStatus.PENDING,
      createdAt: new Date(),
    };
    await repository.save(initialTask);
    const tasks = (repository as any).tasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual(initialTask);
  });

  it("should update an existing task", async () => {
    const initialTask: ITask = {
      id: "1",
      title: "Old Title",
      description: "",
      status: TaskStatus.PENDING,
      createdAt: new Date(),
    };
    await repository.save(initialTask);

    const updateData: UpdateTaskDTO = {
      id: "1",
      title: "New Title",
      status: TaskStatus.COMPLETED,
    };
    const updatedTask = await repository.update(updateData);
    expect(updatedTask.id).toBe("1");
    expect(updatedTask.title).toBe("New Title");
    expect(updatedTask.status).toBe(TaskStatus.COMPLETED);

    const tasks = (repository as any).tasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("New Title");
    expect(tasks[0].status).toBe(TaskStatus.COMPLETED);
  });

  it("should delete an existing task", async () => {
    const initialTasks: ITask[] = [
      {
        id: "1",
        title: "Task 1",
        description: "",
        status: TaskStatus.PENDING,
        createdAt: new Date(),
      },
      {
        id: "2",
        title: "Task 2",
        description: "",
        status: TaskStatus.COMPLETED,
        createdAt: new Date(),
      },
    ];
    (repository as any).tasks = initialTasks;
    await repository.delete("1");
    const tasks = (repository as any).tasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0].id).toBe("2");
  });

  describe("listTasks", () => {
    const task1: ITask = {
      id: "1",
      title: "Task 1",
      description: "",
      status: TaskStatus.PENDING,
      createdAt: new Date("2025-04-15"),
    };
    const task2: ITask = {
      id: "2",
      title: "Task 2",
      description: "",
      status: TaskStatus.COMPLETED,
      createdAt: new Date("2025-04-16"),
    };
    const task3: ITask = {
      id: "3",
      title: "Task 3",
      description: "",
      status: TaskStatus.PENDING,
      createdAt: new Date("2025-04-17"),
    };

    beforeEach(() => {
      (repository as any).tasks = [task1, task2, task3];
    });

    it("should return all tasks when no filters are provided", async () => {
      const tasks = await repository.listTasks();
      expect(tasks).toHaveLength(3);
    });

    it("should filter tasks by status", async () => {
      const filters: Filters = { status: TaskStatus.PENDING };
      const tasks = await repository.listTasks(filters);
      expect(tasks).toHaveLength(2);
      expect(tasks.every((task) => task.status === TaskStatus.PENDING)).toBe(
        true
      );
    });

    it("should filter tasks by createdBefore", async () => {
      const filters: Filters = { createdBefore: "2025-04-16" };
      const tasks = await repository.listTasks(filters);
      expect(tasks).toHaveLength(1);
      expect(tasks[0].id).toBe("1");
    });

    it("should filter tasks by createdAfter", async () => {
      const filters: Filters = { createdAfter: "2025-04-16" };
      const tasks = await repository.listTasks(filters);
      expect(tasks).toHaveLength(1);
      expect(tasks[0].id).toBe("3");
    });

    it("should filter tasks by status and createdBefore", async () => {
      const filters: Filters = {
        status: TaskStatus.PENDING,
        createdBefore: "2025-04-17",
      };
      const tasks = await repository.listTasks(filters);
      expect(tasks).toHaveLength(1);
      expect(tasks[0].id).toBe("1");
    });

    it("should apply limit for pagination", async () => {
      const filters: Filters = { limit: 2 };
      const tasks = await repository.listTasks(filters);
      expect(tasks).toHaveLength(2);
      expect(tasks[0].id).toBe("1");
      expect(tasks[1].id).toBe("2");
    });

    it("should apply limit and page for pagination", async () => {
      const filters: Filters = { limit: 1, page: 2 };
      const tasks = await repository.listTasks(filters);
      expect(tasks).toHaveLength(1);
      expect(tasks[0].id).toBe("2");
    });
  });
});
