import { PatientRepository } from '@/domain/dayli-diet/application/repositories/patient-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Patient } from '@/domain/dayli-diet/enterprise/entities/patient'
import { PrismaPatientMapper } from '../mapper/prisma-patient-mapper'

@Injectable()
export class PrismaPatientRepository implements PatientRepository {
  constructor(private prisma: PrismaService) {}
  async create(patient: Patient): Promise<void> {
    const data = PrismaPatientMapper.toPrisma(patient)

    await this.prisma.user.create({ data })
  }

  async findByEmail(email: string): Promise<Patient | null> {
    const patient = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!patient) {
      return null
    }

    return PrismaPatientMapper.toDomain(patient)
  }

  async findById(id: string): Promise<Patient> {
    const patient = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!patient) {
      throw new Error('Patient not found')
    }

    return PrismaPatientMapper.toDomain(patient)
  }
}
