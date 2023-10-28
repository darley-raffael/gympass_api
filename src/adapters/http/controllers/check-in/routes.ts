import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { history } from "./history";
import { metrics } from "./metrics";
import { create } from "./create";
import { validate } from "./validate";
import { verifyUserRole } from "../../middlewares/verify-user-rule";

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  // routes
  app.post("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("gyms/:gymId/check-ins", create);

  app.patch(
    "check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validate
  );
}
