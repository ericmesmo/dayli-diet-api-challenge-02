import { Either, left, right } from '@/core/either'

import { Injectable } from '@nestjs/common'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { PatientRepository } from '../repositories/patient-repository'
import { WrongCredentialsError } from './error/wrong-credentials-error'

type AuthenticatePatientUseCaseRequest = {
  email: string
  password: string
}

type AuthenticatePatientUseCaseResponse = Either<
  WrongCredentialsError,
  { accessToken: string }
>

@Injectable()
export class AuthenticatePatientUseCase {
  constructor(
    private patientRepository: PatientRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticatePatientUseCaseRequest): Promise<AuthenticatePatientUseCaseResponse> {
    const patient = await this.patientRepository.findByEmail(email)

    if (!patient) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      patient.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: patient.id.toString(),
    })

    return right({ accessToken })
  }
}
