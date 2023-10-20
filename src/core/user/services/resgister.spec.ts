import { InMemoryUserRepository } from "@/external/repositories/in_memory/users-repository";
import { RegisterUseCase } from "./register";
import { beforeEach, describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "@/shared/errors/user-already-exists-error";

let usersRepository: InMemoryUserRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("Should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john@email.com",
      password: "@123456",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("Should hash user password upon register", async () => {
    const newUser = {
      name: "John Doe",
      email: "john@email.com",
      password: "@123456",
    };
    const { user } = await sut.execute(newUser);

    const isPasswordCorrectlyHashed = await compare(
      newUser.password,
      user.password
    );
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("Should not be able to register with same email twice", async () => {
    const newUser = {
      name: "John Doe",
      email: "john@email.com",
      password: "@123456",
    };
    await sut.execute(newUser);
    await expect(() => sut.execute(newUser)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
  });
});
