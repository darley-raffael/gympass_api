import { RegisterUseCase } from "@/core/user/services/register";
import { PrismaUsersRepository } from "@/external/repositories/prisma/pisma-users-repository";

export function makeRegister() {
  const userRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(userRepository);

  return registerUseCase;
}
