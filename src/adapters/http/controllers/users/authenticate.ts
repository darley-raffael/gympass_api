import { InvalidCredentialError } from "@/shared/errors/invalid-credential-error";
import { makeAuthenticateUseCase } from "@/shared/factories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    const { user } = await authenticateUseCase.execute({ email, password });

    const token = await reply.jwtSign(
      {
        rule: user.rule,
      },
      {
        sign: { sub: user.id },
      }
    );

    return reply.status(201).send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(400).send({
        message: err.message,
      });
    }

    throw err;
  }
}
