import { ValueObject } from '@/core/entities/value-object'

export type DietDetailsProps = {
  totalOfMeals: number
  totalOfMealsWithinDiet: number
  totalOfMealsOutsideDiet: number
  bestSequenceOfMealsWithinDiet: number
}

export class DietDetails extends ValueObject<DietDetailsProps> {
  get totalOfMeals() {
    return this.props.totalOfMeals
  }

  get totalOfMealsWithinDiet() {
    return this.props.totalOfMealsWithinDiet
  }

  get totalOfMealsOutsideDiet() {
    return this.props.totalOfMealsOutsideDiet
  }

  get bestSequenceOfMealsWithinDiet() {
    return this.props.bestSequenceOfMealsWithinDiet
  }

  static create(props: DietDetailsProps) {
    return new DietDetails(props)
  }
}
