import { Meal } from '@/domain/dayli-diet/enterprise/entities/meal'

export class MealPresenter {
  static toHTTP(meal: Meal) {
    return {
      id: meal.id.toString(),
      name: meal.name,
      description: meal.description,
      patientId: meal.patientId.toString(),
      isWithinDiet: meal.isWithinDiet,
      mealTime: meal.mealTime,
      createdAt: meal.createdAt,
      updatedAt: meal.updatedAt,
    }
  }
}
