import { BadRequestException, Controller, Get } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { GetDietDetailsUseCase } from '@/domain/dayli-diet/application/use-cases/get-diet-details'
import { DietDetailsPresenter } from '../presenters/diet-details.presenter'

@Controller('/diet')
export class GetDietDetailsController {
  constructor(private getDietDetails: GetDietDetailsUseCase) {}

  @Get()
  async handle(@CurrentUser() { sub }: UserPayload) {
    const result = await this.getDietDetails.execute({
      patientId: sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { dietDetails: DietDetailsPresenter.toHTTP(result.value.diet) }
  }
}
