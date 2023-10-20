import { User } from "@prisma/client";
import { UserRepository } from "../repository";
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found-error";

interface GetUserProfileRequest {
  userId: string;
}
interface GetUserProfileResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new ResourceNotFoundError();

    return { user };
  }
}
