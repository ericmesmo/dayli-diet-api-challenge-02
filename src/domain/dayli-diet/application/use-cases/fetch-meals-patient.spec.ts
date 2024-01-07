import { InMemoryMealRepository } from 'test/repositories/in-memory-meal-repository'
import { makeMeal } from 'test/factories/make-meal'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchMealsPatientUseCase } from './fetch-meals-patient'

let inMemoryMealRepository: InMemoryMealRepository
let sut: FetchMealsPatientUseCase

describe('fetch a meal', () => {
  beforeEach(() => {
    inMemoryMealRepository = new InMemoryMealRepository()
    sut = new FetchMealsPatientUseCase(inMemoryMealRepository)
  })

  it('should be able to fetch meals from a patient', async () => {
    for (let i = 0; i < 21; i++) {
      const newMeal = makeMeal({
        name: `Meal ${i + 1}`,
        patientId: new UniqueEntityID('patient-1'),
      })

      await inMemoryMealRepository.create(newMeal)
    }

    const result = await sut.execute({
      patientId: 'patient-1',
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.meals).toHaveLength(1)
    expect(result.value?.meals[0].name).toEqual('Meal 21')
  })

  it('should not be able to fetch meals from another patient', async () => {
    for (let i = 0; i < 21; i++) {
      const newMeal = makeMeal({
        name: `Meal ${i + 1}`,
        patientId: new UniqueEntityID('patient-1'),
      })

      await inMemoryMealRepository.create(newMeal)
    }

    const result = await sut.execute({
      patientId: 'patient-2',
      page: 2,
    })

    console.log(result.value)

    expect(result.value?.meals).toHaveLength(0)
  })
})
