import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found-error";
import { InMemoryUserRepository } from "@/external/repositories/in_memory/users-repository";

let userRepository: InMemoryUserRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new GetUserProfileUseCase(userRepository);
  });

  it("should be able to get user profile", async () => {
    const createUser = await userRepository.create({
      name: "John Doe",
      email: "john@email.com",
      password: await hash("@123456", 6),
    });

    const { user } = await sut.execute({
      userId: createUser.id,
    });

    expect(user.id).toEqual(createUser.id);
  });

  it("should not be able to get user profile with invalid id", async () => {
    await expect(
      sut.execute({
        userId: "invalid-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
