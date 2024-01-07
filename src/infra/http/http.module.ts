import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { RegisterPatientUseCase } from '@/domain/dayli-diet/application/use-cases/register-patient'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthenticatePatientUseCase } from '@/domain/dayli-diet/application/use-cases/authenticate'
import { CreateMealController } from './controllers/create-meal.controller'
import { CreateMealUseCase } from '@/domain/dayli-diet/application/use-cases/create-meal'
import { EditMealController } from './controllers/edit-meal.controller'
import { EditMealUseCase } from '@/domain/dayli-diet/application/use-cases/edit-meal'
import { DeleteMealController } from './controllers/delete-meal.controller'
import { DeleteMealUseCase } from '@/domain/dayli-diet/application/use-cases/delete-meal'
import { FetchMealsPatientController } from './controllers/fetch-meals-patient.controller'
import { FetchMealsPatientUseCase } from '@/domain/dayli-diet/application/use-cases/fetch-meals-patient'
import { FetchMealByIdController } from './controllers/fetch-meal-by-id.controller'
import { FetchMealByIdUseCase } from '@/domain/dayli-diet/application/use-cases/fetch-meal-by-id'
import { GetDietDetailsController } from './controllers/get-diet-details.controller'
import { GetDietDetailsUseCase } from '@/domain/dayli-diet/application/use-cases/get-diet-details'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateMealController,
    EditMealController,
    DeleteMealController,
    FetchMealsPatientController,
    FetchMealByIdController,
    GetDietDetailsController,
  ],
  providers: [
    RegisterPatientUseCase,
    AuthenticatePatientUseCase,
    CreateMealUseCase,
    EditMealUseCase,
    DeleteMealUseCase,
    FetchMealsPatientUseCase,
    FetchMealByIdUseCase,
    GetDietDetailsUseCase,
  ],
})
export class HttpModule {}
