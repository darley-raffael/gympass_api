import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRule(ruleToVerify: "ADMIN" | "MEMBER") {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { rule } = request.user;
    if (rule !== ruleToVerify) {
      return reply.status(401).send({ message: "Unauthorized. Only ADMIN" });
    }
  };
}
