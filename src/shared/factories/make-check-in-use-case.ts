import { CheckInUseCase } from "@/core/check-in/services/check-in";
import { PrismaCheckInsRepository } from "@/external/repositories/prisma/prisma-check-ins-repository";
import { PrismaGymsRepository } from "@/external/repositories/prisma/prisma-gyms-repository";

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

  return useCase;
}
