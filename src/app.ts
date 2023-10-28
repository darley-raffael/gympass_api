import fastify from "fastify";
import { usersRoutes } from "./adapters/http/controllers/users/routes";
import { ZodError } from "zod";
import { env } from "./shared/env";
import { fastifyJwt } from "@fastify/jwt";
import { gymsRoutes } from "./adapters/http/controllers/gyms/routes";
import { verifyUserRole } from "./adapters/http/middlewares/verify-user-rule";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(usersRoutes);
app.register(gymsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({
    message: "Internal server error",
  });
});
