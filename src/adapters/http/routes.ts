import { FastifyInstance } from "fastify";
import { register } from "./controllers/userControllers/register";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
}
