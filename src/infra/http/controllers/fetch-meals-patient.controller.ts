import { FetchMealsPatientUseCase } from '@/domain/dayli-diet/application/use-cases/fetch-meals-patient'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { MealPresenter } from '../presenters/meal.presenter'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/meals')
export class FetchMealsPatientController {
  constructor(private fetchMealsPatient: FetchMealsPatientUseCase) {}

  @Get()
  async handle(
    @Query('page', new ZodValidationPipe(pageQueryParamsSchema))
    page: PageQueryParamSchema,
    @CurrentUser() { sub }: UserPayload,
  ) {
    const result = await this.fetchMealsPatient.execute({
      page,
      patientId: sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const meals = result.value.meals

    return {
      meals: meals.map(MealPresenter.toHTTP),
    }
  }
}
