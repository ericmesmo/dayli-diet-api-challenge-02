import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { Meal } from '../../enterprise/entities/meal'
import { MealRepository } from '../repositories/meal-repository'

type EditMealUseCaseRequest = {
  mealId: string
  name: string
  description: string
  mealTime: Date
  isWithinDiet: boolean
  patientId: string
}

type EditMealUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { meal: Meal }
>

@Injectable()
export class EditMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    mealId,
    name,
    description,
    mealTime,
    isWithinDiet,
    patientId,
  }: EditMealUseCaseRequest): Promise<EditMealUseCaseResponse> {
    const meal = await this.mealRepository.findById(mealId)

    if (!meal) {
      return left(new ResourceNotFoundError())
    }

    if (patientId !== meal.patientId.toString()) {
      return left(new NotAllowedError())
    }

    meal.name = name
    meal.description = description
    meal.mealTime = mealTime
    meal.isWithinDiet = isWithinDiet

    await this.mealRepository.save(meal)

    return right({ meal })
  }
}
