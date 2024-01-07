import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { z } from 'zod'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { EditMealUseCase } from '@/domain/dayli-diet/application/use-cases/edit-meal'

const editMealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  mealTime: z.coerce.date(),
  isWithinDiet: z.boolean(),
})

type EditMealBodySchema = z.infer<typeof editMealBodySchema>

@Controller('/meal/:id')
export class EditMealController {
  constructor(private editMeal: EditMealUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipe(editMealBodySchema))
    body: EditMealBodySchema,
    @Param('id') mealId: string,
  ) {
    const { name, description, mealTime, isWithinDiet } = body
    const patientId = user.sub

    const result = await this.editMeal.execute({
      mealId,
      name,
      description,
      isWithinDiet,
      mealTime,
      patientId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
