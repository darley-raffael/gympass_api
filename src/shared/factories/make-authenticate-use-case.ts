import { AuthenticateUseCase } from "@/core/user/services/authenticate";
import { PrismaUsersRepository } from "@/external/repositories/prisma/pisma-users-repository";

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository);

  return authenticateUseCase;
}
