import { GetUserMetricsUseCase } from "@/core/check-in/services/get-user-metrics";
import { PrismaCheckInsRepository } from "@/external/repositories/prisma/prisma-check-ins-repository";

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
}
