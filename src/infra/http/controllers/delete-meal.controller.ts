import {
  BadRequestException,
  Controller,
  Delete,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { DeleteMealUseCase } from '@/domain/dayli-diet/application/use-cases/delete-meal'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

@Controller('/meal/:id')
export class DeleteMealController {
  constructor(private deleteMeal: DeleteMealUseCase) {}

  @Delete()
  async handle(@CurrentUser() user: UserPayload, @Param('id') mealId: string) {
    const patientId = user.sub

    const result = await this.deleteMeal.execute({
      mealId,
      patientId,
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
  }
}
