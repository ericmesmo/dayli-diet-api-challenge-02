import { DietDetails } from '@/domain/dayli-diet/enterprise/entities/value-objects/diet-details'

export class DietDetailsPresenter {
  static toHTTP(details: DietDetails) {
    return {
      totalOfMeals: details.totalOfMeals,
      totalOfMealsWithinDiet: details.totalOfMealsWithinDiet,
      totalOfMealsOutsideDiet: details.totalOfMealsOutsideDiet,
      bestSequenceOfMealsWithinDiet: details.bestSequenceOfMealsWithinDiet,
    }
  }
}
