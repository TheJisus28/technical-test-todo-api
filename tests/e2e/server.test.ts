import request from "supertest";
import app from "../../src/server";

describe("Server Endpoints", () => {
  it('should respond with "Hello from Express with TypeScript!" on GET /test', async () => {
    const response = await request(app).get("/test");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Hello from Express with TypeScript!");
  });
});
