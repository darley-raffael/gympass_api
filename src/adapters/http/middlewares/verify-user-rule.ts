import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVerify: "ADMIN" | "MEMBER") {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { rule } = request.user;

    if (rule !== roleToVerify) {
      return reply.status(401).send({ message: "Unauthorized." });
    }
  };
}
