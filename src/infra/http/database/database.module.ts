import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { MealRepository } from '@/domain/dayli-diet/application/repositories/meal-repository'
import { PrismaMealRepository } from './prisma/repositories/prisma-meal-repository'
import { PatientRepository } from '@/domain/dayli-diet/application/repositories/patient-repository'
import { PrismaPatientRepository } from './prisma/repositories/prisma-patient-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: MealRepository,
      useClass: PrismaMealRepository,
    },
    {
      provide: PatientRepository,
      useClass: PrismaPatientRepository,
    },
  ],
  exports: [PrismaService, MealRepository, PatientRepository],
})
export class DatabaseModule {}
