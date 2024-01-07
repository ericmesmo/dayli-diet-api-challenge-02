import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Meal } from '../../enterprise/entities/meal'
import { DietDetails } from '../../enterprise/entities/value-objects/diet-details'

export abstract class MealRepository {
  abstract create(meal: Meal): Promise<void>
  abstract save(meal: Meal): Promise<void>
  abstract delete(meal: Meal): Promise<void>

  abstract findById(id: string): Promise<Meal | null>
  abstract findManyByPatientId(
    patientId: string,
    { page }: PaginationParams,
  ): Promise<Meal[]>

  abstract findDetailsByPatientId(
    patientId: string,
  ): Promise<DietDetails | null>
}
