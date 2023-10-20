import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../repository";
import { GymsRepository } from "@/core/gym/repository";
import { ResourceNotFoundError } from "@/shared/errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/shared/utils/coordinates-distance";
import { MaxDistanceError } from "@/shared/errors/max-distance-error";
import { MaxNumberCheckInError } from "@/shared/errors/max-number-check-in-error";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) throw new ResourceNotFoundError();

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) throw new MaxDistanceError();

    const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDate) throw new MaxNumberCheckInError();

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
