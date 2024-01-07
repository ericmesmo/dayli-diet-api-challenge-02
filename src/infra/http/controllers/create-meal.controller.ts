import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { z } from 'zod'
import { CreateMealUseCase } from '@/domain/dayli-diet/application/use-cases/create-meal'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const createMealBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  mealTime: z.coerce.date(),
  isWithinDiet: z.boolean(),
})

type CreateMealBodySchema = z.infer<typeof createMealBodySchema>

@Controller('/meal')
export class CreateMealController {
  constructor(private createMeal: CreateMealUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(new ZodValidationPipe(createMealBodySchema))
    body: CreateMealBodySchema,
  ) {
    const { name, description, mealTime, isWithinDiet } = body
    const patientId = user.sub

    const result = await this.createMeal.execute({
      name,
      description,
      mealTime,
      isWithinDiet,
      patientId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
