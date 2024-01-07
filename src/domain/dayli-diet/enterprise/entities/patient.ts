import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

type PatientProps = {
  name: string
  email: string
  password: string
}

export class Patient extends Entity<PatientProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  static create(props: PatientProps, id?: UniqueEntityID) {
    const patient = new Patient(props, id)
    return patient
  }
}
