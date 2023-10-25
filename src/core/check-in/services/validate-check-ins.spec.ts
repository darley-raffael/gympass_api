import { InMemoryCheckInsRepository } from "@/external/repositories/in_memory/check-ins-repository";
import { ValidateCheckInsUseCase } from "./validate-check-ins";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found-error";


let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInsUseCase;

describe("Validate Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInsUseCase(checkInsRepository);

    vi.useFakeTimers();
  })

  afterEach(() => {
    vi.useRealTimers();

  })


  it("should be able to validate a check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })

    expect(checkIn.id).toEqual(createdCheckIn.id);
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  })


  it("should not be able to validate an inexistent check-in", async () => {
    await expect(sut.execute({
      checkInId: "inexistent-check-in-id"
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it("should not be able to validate a check-in more than 20 minutes old", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(sut.execute({
      checkInId: createdCheckIn.id
    })).rejects.toBeInstanceOf(Error)

  })

})