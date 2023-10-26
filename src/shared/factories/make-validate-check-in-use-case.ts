import { ValidateCheckInsUseCase } from "@/core/check-in/services/validate-check-ins";
import { PrismaCheckInsRepository } from "@/external/repositories/prisma/prisma-check-ins-repository";

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInsUseCase(checkInsRepository);

  return useCase;
}
