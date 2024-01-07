import { PaginationParams } from '@/core/repositories/pagination-params'
import { MealRepository } from '@/domain/dayli-diet/application/repositories/meal-repository'
import { Meal } from '@/domain/dayli-diet/enterprise/entities/meal'

export class InMemoryMealRepository implements MealRepository {
  public items: Meal[] = []

  async create(meal: Meal): Promise<void> {
    this.items.push(meal)
  }

  async save(meal: Meal): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === meal.id)

    this.items[itemIndex] = meal
  }

  async delete(meal: Meal): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === meal.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<Meal | null> {
    const meal = this.items.find((item) => item.id.toString() === id)

    if (!meal) {
      return null
    }

    return meal
  }

  /* async findManyRecent({ page }: PaginationParams): Promise<Meal[]> {
    const meals = this.items
      .sort((a, b) => b.mealTime.getTime() - a.mealTime.getTime())
      .slice((page - 1) * 20, page * 20)

    return meals
  } */

  async findManyByPatientId(
    patientId: string,
    { page }: PaginationParams = { page: 1 },
  ): Promise<Meal[]> {
    const meals = this.items
      .filter((item) => item.patientId.toString() === patientId)
      .sort((a, b) => b.mealTime.getTime() - a.mealTime.getTime())
      .slice((page - 1) * 20, page * 20)

    return meals
  }
}
