import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Meal } from '@/domain/dayli-diet/enterprise/entities/meal'
import { Meal as PrismaMeal, Prisma } from '@prisma/client'

export class PrismaMealMapper {
  static toDomain(meal: PrismaMeal): Meal {
    return Meal.create(
      {
        name: meal.name,
        description: meal.description,
        patientId: new UniqueEntityID(meal.patientId),
        isWithinDiet: meal.isWithinDiet,
        mealTime: meal.mealTime,
        createdAt: meal.createdAt,
        updatedAt: meal.updatedAt,
      },
      new UniqueEntityID(meal.id),
    )
  }

  static toPrisma(raw: Meal): Prisma.MealUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      name: raw.name,
      description: raw.description,
      patientId: raw.patientId.toString(),
      isWithinDiet: raw.isWithinDiet,
      mealTime: raw.mealTime,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }
  }
}
