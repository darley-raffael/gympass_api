import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../repository";

interface FetchUserCheckInsHistoryRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInsHistoryResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(
      userId,
      page
    );

    return { checkIns };
  }
}
