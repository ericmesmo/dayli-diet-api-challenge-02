import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { MealPresenter } from '../presenters/meal.presenter'
import { FetchMealByIdUseCase } from '@/domain/dayli-diet/application/use-cases/fetch-meal-by-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

@Controller('/meal/:id')
export class FetchMealByIdController {
  constructor(private fetchMealById: FetchMealByIdUseCase) {}

  @Get()
  async handle(
    @Param('id', new ZodValidationPipe(z.string())) mealId: string,
    @CurrentUser()
    { sub }: UserPayload,
  ) {
    const result = await this.fetchMealById.execute({
      mealId,
      patientId: sub,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case NotAllowedError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      meal: MealPresenter.toHTTP(result.value.meal),
    }
  }
}
