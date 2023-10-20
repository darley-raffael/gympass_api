import { User } from "@prisma/client";
import { UserRepository } from "../repository";
import { InvalidCredentialError } from "@/shared/errors/invalid-credential-error";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new InvalidCredentialError();

    const isPasswordCorrectlyHashed = await compare(password, user.password);

    if (!isPasswordCorrectlyHashed) throw new InvalidCredentialError();

    return { user };
  }
}
