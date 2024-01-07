import { Either, left, right } from '@/core/either'

import { Injectable } from '@nestjs/common'
import { Patient } from '../../enterprise/entities/patient'
import { PatientRepository } from '../repositories/patient-repository'
import { HashGenerator } from '../cryptography/hash-generator'
import { PatientAlreadyExistsError } from './error/patient-already-exists-error'

type RegisterPatientUseCaseRequest = {
  name: string
  email: string
  password: string
}

type RegisterPatientUseCaseResponse = Either<
  PatientAlreadyExistsError,
  { patient: Patient }
>

@Injectable()
export class RegisterPatientUseCase {
  constructor(
    private patientRepository: PatientRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterPatientUseCaseRequest): Promise<RegisterPatientUseCaseResponse> {
    const patientWithSameEmail = await this.patientRepository.findByEmail(email)

    if (patientWithSameEmail) {
      return left(new PatientAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const patient = Patient.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.patientRepository.create(patient)

    return right({ patient })
  }
}
