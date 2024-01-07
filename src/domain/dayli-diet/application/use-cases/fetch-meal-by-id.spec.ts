import { InMemoryMealRepository } from 'test/repositories/in-memory-meal-repository'
import { makeMeal } from 'test/factories/make-meal'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchMealByIdUseCase } from './fetch-meal-by-id'

let inMemoryMealRepository: InMemoryMealRepository
let sut: FetchMealByIdUseCase

describe('fetch a meal by id', () => {
  beforeEach(() => {
    inMemoryMealRepository = new InMemoryMealRepository()
    sut = new FetchMealByIdUseCase(inMemoryMealRepository)
  })

  it('should be able to fetch a meal from a patient by id', async () => {
    const newMeal = makeMeal({
      name: 'Meal 1',
      patientId: new UniqueEntityID('patient-1'),
    })

    await inMemoryMealRepository.create(newMeal)

    const result = await sut.execute({
      patientId: 'patient-1',
      mealId: newMeal.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryMealRepository.items[0].name).toEqual('Meal 1')
  })

  /*  it('should not be able to fetch meals from another patient', async () => {
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
  }) */
})
