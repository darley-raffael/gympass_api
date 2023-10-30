import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";
import { verifyUserRule } from "../../middlewares/verify-user-rule";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  // routes
  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);
  app.post("/gyms", { onRequest: [verifyUserRule("ADMIN")] }, create);
}
