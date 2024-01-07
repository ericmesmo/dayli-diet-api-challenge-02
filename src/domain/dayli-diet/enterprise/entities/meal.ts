import { Optional } from '@/core/types/optional'
import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

export type MealProps = {
  name: string
  description: string
  mealTime: Date
  isWithinDiet: boolean
  patientId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date | null
}

export class Meal extends Entity<MealProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get excerpt() {
    return this.description.substring(0, 120).trimEnd().concat('...')
  }

  get mealTime() {
    return this.props.mealTime
  }

  set mealTime(mealTime: Date) {
    this.props.mealTime = mealTime
    this.touch()
  }

  get isWithinDiet() {
    return this.props.isWithinDiet
  }

  set isWithinDiet(isWithinDiet: boolean) {
    this.props.isWithinDiet = isWithinDiet
    this.touch()
  }

  get patientId() {
    return this.props.patientId
  }

  set patientId(patientId: UniqueEntityID) {
    this.props.patientId = patientId
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<MealProps, 'createdAt'>, id?: UniqueEntityID) {
    const meal = new Meal(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return meal
  }
}
