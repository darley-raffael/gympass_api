import { beforeEach, describe, expect, it } from "vitest";
import { UserRepository } from "../repository";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryUserRepository } from "@/external/repositories/in_memory/users-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialError } from "@/shared/errors/invalid-credential-error";

let userRepository: UserRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new AuthenticateUseCase(userRepository);
  });

  it("Should be able to authenticate", async () => {
    await userRepository.create({
      name: "John Doe",
      email: "john@email.com",
      password: await hash("@123456", 6),
    });

    const { user } = await sut.execute({
      email: "john@email.com",
      password: "@123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not be able to authenticate with invalid credentials", async () => {
    await expect(
      sut.execute({
        email: "john@email.com",
        password: "@123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it("Should not be able to authenticate with invalid password", async () => {
    await userRepository.create({
      name: "John Doe",
      email: "john@email.com",
      password: await hash("@123456", 6),
    });

    await expect(
      sut.execute({
        email: "john@email.com",
        password: "@12345",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });

  it("Should not be able to authenticate with invalid email", async () => {
    await userRepository.create({
      name: "John Doe",
      email: "john@email.com",
      password: await hash("@123456", 6),
    });

    await expect(
      sut.execute({
        email: "john2@email.com",
        password: "@123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialError);
  });
});
