import { FetchUserCheckInsHistoryUseCase } from "@/core/check-in/services/fetch-user-checkins-history";
import { PrismaCheckInsRepository } from "@/external/repositories/prisma/prisma-check-ins-repository";

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}
