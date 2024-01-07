import { Injectable } from '@nestjs/common'
import { MealRepository } from '../repositories/meal-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

type DeleteMealUseCaseRequest = {
  mealId: string
  patientId: string
}

type DeleteMealUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    mealId,
    patientId,
  }: DeleteMealUseCaseRequest): Promise<DeleteMealUseCaseResponse> {
    const meal = await this.mealRepository.findById(mealId)

    if (!meal) {
      return left(new ResourceNotFoundError())
    }

    if (meal.patientId.toString() !== patientId) {
      return left(new NotAllowedError())
    }

    await this.mealRepository.delete(meal)

    return right(null)
  }
}
