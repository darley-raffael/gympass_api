import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  const { rule } = request.user;

  const token = await reply.jwtSign(
    { rule },
    {
      sign: { sub: request.user.sub },
    }
  );

  const refreshToken = await reply.jwtSign(
    { rule },
    {
      sign: { sub: request.user.sub, expiresIn: "7d" },
    }
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token });
}
