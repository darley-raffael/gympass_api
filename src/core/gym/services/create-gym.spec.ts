import { InMemoryGymsRepository } from "@/external/repositories/in_memory/gyms-repository";
import { CreateGymUseCase } from "./create-gym";
import { beforeEach, describe, expect, it } from "vitest";

let gymRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });
    expect(gym.id).toEqual(expect.any(String));
  });
});
