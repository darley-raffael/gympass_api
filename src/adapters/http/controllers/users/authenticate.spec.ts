import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Register (e2e)", () => {
  beforeAll(() => {
    app.ready();
  });

  afterAll(() => {
    app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "john@email.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
