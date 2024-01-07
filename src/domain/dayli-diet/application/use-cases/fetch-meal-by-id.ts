import { Either, left, right } from '@/core/either'
import { MealRepository } from '../repositories/meal-repository'
import { Meal } from '../../enterprise/entities/meal'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

type FetchMealByIdUseCaseRequest = {
  mealId: string
  patientId: string
}

type FetchMealByIdUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { meal: Meal }
>

@Injectable()
export class FetchMealByIdUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    mealId,
    patientId,
  }: FetchMealByIdUseCaseRequest): Promise<FetchMealByIdUseCaseResponse> {
    const meal = await this.mealRepository.findById(mealId)

    if (!meal) {
      return left(new ResourceNotFoundError())
    }

    if (meal.patientId.toString() !== patientId) {
      return left(new NotAllowedError())
    }

    return right({ meal })
  }
}
