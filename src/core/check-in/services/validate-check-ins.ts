import { ResourceNotFoundError } from "@/shared/errors/resource-not-found-error";
import { CheckIn } from "@prisma/client";
import dayjs from "dayjs";
import { CheckInsRepository } from "../repository";

interface ValidateCheckInsRequest {
  checkInId: string;
}

interface ValidateCheckInsResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInsUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInsRequest): Promise<ValidateCheckInsResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);
    if (!checkIn) throw new ResourceNotFoundError();

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distanceInMinutesFromCheckInCreation > 20)
      throw new Error("Check-in is too old.");

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
