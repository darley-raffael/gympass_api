import { InMemoryCheckInsRepository } from "@/external/repositories/in_memory/check-ins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";
import { beforeEach, describe, expect, it } from "vitest";



let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("should be able to get user metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    })

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    })

    expect(checkInsCount).toEqual(2);
  })

})