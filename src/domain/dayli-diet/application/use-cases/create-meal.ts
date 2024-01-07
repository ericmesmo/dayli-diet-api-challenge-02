import { Either, right } from '@/core/either'
import { Meal } from '../../enterprise/entities/meal'
import { Injectable } from '@nestjs/common'
import { MealRepository } from '../repositories/meal-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type CreateMealUseCaseRequest = {
  name: string
  description: string
  mealTime: Date
  isWithinDiet: boolean
  patientId: string
}

type CreateMealUseCaseResponse = Either<null, { meal: Meal }>

@Injectable()
export class CreateMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    name,
    description,
    mealTime,
    isWithinDiet,
    patientId,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const meal = Meal.create({
      name,
      description,
      mealTime,
      isWithinDiet,
      patientId: new UniqueEntityID(patientId),
    })

    await this.mealRepository.create(meal)

    return right({ meal })
  }
}
