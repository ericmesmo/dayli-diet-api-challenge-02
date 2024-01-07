import { InMemoryMealRepository } from 'test/repositories/in-memory-meal-repository'
import { EditMealUseCase } from './edit-meal'
import { makeMeal } from 'test/factories/make-meal'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let inMemoryMealRepository: InMemoryMealRepository
let sut: EditMealUseCase

describe('edit a meal', () => {
  beforeEach(() => {
    inMemoryMealRepository = new InMemoryMealRepository()
    sut = new EditMealUseCase(inMemoryMealRepository)
  })

  it('should be able to edit a meal', async () => {
    const newMeal = makeMeal({
      patientId: new UniqueEntityID('patient-1'),
    })

    await inMemoryMealRepository.create(newMeal)

    const result = await sut.execute({
      mealId: newMeal.id.toString(),
      name: 'Meal 1 Edited',
      description: 'Description of Meal 1 Edited',
      mealTime: newMeal.mealTime,
      isWithinDiet: newMeal.isWithinDiet,
      patientId: newMeal.patientId.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryMealRepository.items).toHaveLength(1)
    expect(inMemoryMealRepository.items[0].name).toEqual('Meal 1 Edited')
  })

  it('should not be able to edit a meal from another patient', async () => {
    const newMeal = makeMeal({
      patientId: new UniqueEntityID('patient-1'),
    })

    await inMemoryMealRepository.create(newMeal)

    const result = await sut.execute({
      mealId: newMeal.id.toString(),
      name: 'Meal 1 Edited',
      description: 'Description of Meal 1 Edited',
      mealTime: newMeal.mealTime,
      isWithinDiet: newMeal.isWithinDiet,
      patientId: 'patient-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(new NotAllowedError())
  })
})
