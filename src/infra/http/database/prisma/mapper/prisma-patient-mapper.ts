import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Patient } from '@/domain/dayli-diet/enterprise/entities/patient'
import { User as PrismaPatient, Prisma } from '@prisma/client'

export class PrismaPatientMapper {
  static toDomain(patient: PrismaPatient): Patient {
    return Patient.create(
      {
        email: patient.email,
        name: patient.name,
        password: patient.password,
      },
      new UniqueEntityID(patient.id),
    )
  }

  static toPrisma(raw: Patient): Prisma.UserUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      email: raw.email,
      name: raw.name,
      password: raw.password,
    }
  }
}
