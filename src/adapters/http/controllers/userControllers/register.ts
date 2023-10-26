import { UserAlreadyExistsError } from "@/shared/errors/user-already-exists-error";
import { makeRegister } from "@/shared/factories/make-register-useCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);
  try {
    const registerUseCase = makeRegister();
    const user = await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(400).send({
        message: err.message,
      });
    }

    throw err;
  }

  return reply.status(201).send();
}
