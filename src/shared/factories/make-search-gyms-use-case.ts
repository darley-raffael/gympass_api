import { SearchGymsUseCase } from "@/core/gym/services/search-gym";
import { PrismaGymsRepository } from "@/external/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}
