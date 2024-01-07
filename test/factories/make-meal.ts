import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Meal, MealProps } from '@/domain/dayli-diet/enterprise/entities/meal'

export function makeMeal(
  override: Partial<MealProps> = {},
  id?: UniqueEntityID,
) {
  const meal = Meal.create(
    {
      name: 'Meal 1',
      description: 'Description of Meal 1',
      mealTime: new Date(),
      isWithinDiet: true,
      patientId: new UniqueEntityID('patient-1'),
      ...override,
    },
    id,
  )

  return meal
}
