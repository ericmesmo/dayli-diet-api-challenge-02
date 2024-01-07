import { MealRepository } from '@/domain/dayli-diet/application/repositories/meal-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { Meal } from '@/domain/dayli-diet/enterprise/entities/meal'
import { PrismaMealMapper } from '../mapper/prisma-meal-mapper'
import { DietDetails } from '@/domain/dayli-diet/enterprise/entities/value-objects/diet-details'

@Injectable()
export class PrismaMealRepository implements MealRepository {
  constructor(private prisma: PrismaService) {}
  async create(meal: Meal): Promise<void> {
    const data = PrismaMealMapper.toPrisma(meal)

    await this.prisma.meal.create({ data })
  }

  async save(meal: Meal): Promise<void> {
    const data = PrismaMealMapper.toPrisma(meal)

    await this.prisma.meal.update({
      where: {
        id: meal.id.toString(),
      },
      data,
    })
  }

  async delete(meal: Meal): Promise<void> {
    await this.prisma.meal.delete({
      where: {
        id: meal.id.toString(),
      },
    })
  }

  async findById(id: string): Promise<Meal | null> {
    const meal = await this.prisma.meal.findUnique({
      where: {
        id,
      },
    })

    if (!meal) {
      return null
    }

    return PrismaMealMapper.toDomain(meal)
  }

  async findManyByPatientId(
    patientId: string,
    { page }: PaginationParams,
  ): Promise<Meal[]> {
    const meals = await this.prisma.meal.findMany({
      where: {
        patientId,
      },
      skip: (page - 1) * 20,
      take: 20,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return meals.map(PrismaMealMapper.toDomain)
  }

  async findDetailsByPatientId(patientId: string): Promise<DietDetails | null> {
    const meals = await this.prisma.meal.findMany({
      where: {
        patientId,
      },
      orderBy: {
        mealTime: 'asc',
      },
    })

    if (meals.length === 0) {
      return null
    }

    let maxSequence = 0
    let currentSequence = 0

    for (const meal of meals) {
      if (meal.isWithinDiet) {
        currentSequence++
        maxSequence = Math.max(maxSequence, currentSequence)
      } else {
        currentSequence = 0
      }
    }

    const totalOfMeals = meals.length
    const totalOfMealsWithinDiet = meals.filter(
      (meal) => meal.isWithinDiet,
    ).length
    const totalOfMealsOutsideDiet = totalOfMeals - totalOfMealsWithinDiet
    const bestSequenceOfMealsWithinDiet = maxSequence

    const dietDetails = DietDetails.create({
      totalOfMeals,
      totalOfMealsWithinDiet,
      totalOfMealsOutsideDiet,
      bestSequenceOfMealsWithinDiet,
    })

    return dietDetails
  }
}
