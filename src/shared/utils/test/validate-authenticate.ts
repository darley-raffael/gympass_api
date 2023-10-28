import { prisma } from "@/external/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false
) {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example",
      password: await hash("123456", 6),
      rule: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "john@example",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
