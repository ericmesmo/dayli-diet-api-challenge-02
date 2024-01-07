import { InMemoryMealRepository } from 'test/repositories/in-memory-meal-repository'
import { CreateMealUseCase } from './create-meal'

let inMemoryMealRepository: InMemoryMealRepository
let sut: CreateMealUseCase

describe('create a meal', () => {
  beforeEach(() => {
    inMemoryMealRepository = new InMemoryMealRepository()
    sut = new CreateMealUseCase(inMemoryMealRepository)
  })

  it('should be able to create a meal', async () => {
    const result = await sut.execute({
      name: 'Meal 1',
      description: 'Description of Meal 1',
      mealTime: new Date(),
      isWithinDiet: true,
      patientId: 'patient-1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryMealRepository.items).toHaveLength(1)
    expect(inMemoryMealRepository.items[0].name).toEqual('Meal 1')
  })
})
