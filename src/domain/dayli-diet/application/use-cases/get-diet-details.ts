import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { MealRepository } from '../repositories/meal-repository'
import { DietDetails } from '../../enterprise/entities/value-objects/diet-details'

type GetDietDetailsUseCaseRequest = {
  patientId: string
}

type GetDietDetailsUseCaseResponse = Either<
  ResourceNotFoundError,
  { diet: DietDetails }
>
@Injectable()
export class GetDietDetailsUseCase {
  constructor(private mealsRepository: MealRepository) {}

  async execute({
    patientId,
  }: GetDietDetailsUseCaseRequest): Promise<GetDietDetailsUseCaseResponse> {
    const diet = await this.mealsRepository.findDetailsByPatientId(patientId)

    if (!diet) {
      return left(new ResourceNotFoundError())
    }

    return right({ diet })
  }
}
