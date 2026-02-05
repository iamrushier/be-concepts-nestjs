import { Controller, Get, Query } from '@nestjs/common';
import { DivideService } from "./divide.service"

@Controller('divide')
export class DivideController {
    constructor(private readonly divideService: DivideService) { }

    @Get()
    divide(@Query("a") a: string, @Query("b") b: string) {
        const numA = parseFloat(a)
        const numB = parseFloat(b)

        if (isNaN(numA) || isNaN(numB)) {
            return { error: "Invalid inputs" }
        }
        return { result: this.divideService.divide(numA, numB) }
    }
}
