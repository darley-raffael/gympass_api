import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string;
      rule: "MEMBER" | "ADMIN";
    };
  }
}
