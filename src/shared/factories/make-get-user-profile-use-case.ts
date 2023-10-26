import { GetUserProfileUseCase } from "@/core/user/services/get-user-profile";
import { PrismaUsersRepository } from "@/external/repositories/prisma/pisma-users-repository";

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);

  return useCase;
}
