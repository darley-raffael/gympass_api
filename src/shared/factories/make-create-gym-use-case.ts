import { CreateGymUseCase } from "@/core/gym/services/create-gym";
import { PrismaGymsRepository } from "@/external/repositories/prisma/prisma-gyms-repository";

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
}
