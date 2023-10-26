import { FetchNearbyGymsUseCase } from "@/core/gym/services/fetch-nearby-gyms";
import { PrismaGymsRepository } from "@/external/repositories/prisma/prisma-gyms-repository";

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}
