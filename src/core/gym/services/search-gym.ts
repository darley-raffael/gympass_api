import { Gym } from "@prisma/client";
import { GymsRepository } from "../repository";


interface SearchGymUseCaseRequest {
  query: string;
  page: number;
}

interface SearchGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) { }


  async execute({
    query,
    page
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {

    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }

}