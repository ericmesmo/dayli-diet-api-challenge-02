import { InMemoryMealRepository } from 'test/repositories/in-memory-meal-repository'
import { DeleteMealUseCase } from './delete-meal'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeMeal } from 'test/factories/make-meal'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let inMemoryMealRepository: InMemoryMealRepository
let sut: DeleteMealUseCase

describe('delete a meal', () => {
  beforeEach(() => {
    inMemoryMealRepository = new InMemoryMealRepository()
    sut = new DeleteMealUseCase(inMemoryMealRepository)
  })

  it('should be able to delete a meal', async () => {
    const meal1 = makeMeal(
      {
        name: 'Meal 1',
        patientId: new UniqueEntityID('patient-1'),
      },
      new UniqueEntityID('meal-1'),
    )

    const meal2 = makeMeal(
      {
        name: 'Meal 2',
        patientId: new UniqueEntityID('patient-1'),
      },
      new UniqueEntityID('meal-2'),
    )

    await inMemoryMealRepository.create(meal1)
    await inMemoryMealRepository.create(meal2)

    const result = await sut.execute({
      mealId: 'meal-1',
      patientId: 'patient-1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryMealRepository.items).toHaveLength(1)
    expect(inMemoryMealRepository.items[0].name).toEqual('Meal 2')
  })

  it('should not be able to delete a meal from another patient', async () => {
    const meal1 = makeMeal(
      {
        name: 'Meal 1',
        patientId: new UniqueEntityID('patient-1'),
      },
      new UniqueEntityID('meal-1'),
    )

    await inMemoryMealRepository.create(meal1)

    const result = await sut.execute({
      mealId: 'meal-1',
      patientId: 'patient-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(new NotAllowedError())
  })
})
