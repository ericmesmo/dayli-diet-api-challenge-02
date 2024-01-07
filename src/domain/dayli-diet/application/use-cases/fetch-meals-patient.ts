import { Either, right } from '@/core/either'
import { MealRepository } from '../repositories/meal-repository'
import { Meal } from '../../enterprise/entities/meal'
import { Injectable } from '@nestjs/common'

type FetchMealsPatientUseCaseRequest = {
  patientId: string
  page: number
}

type FetchMealsPatientUseCaseResponse = Either<null, { meals: Meal[] }>

@Injectable()
export class FetchMealsPatientUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({
    patientId,
    page,
  }: FetchMealsPatientUseCaseRequest): Promise<FetchMealsPatientUseCaseResponse> {
    const meals = await this.mealRepository.findManyByPatientId(patientId, {
      page,
    })

    return right({ meals })
  }
}
