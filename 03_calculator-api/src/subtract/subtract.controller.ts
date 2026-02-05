import { Controller, Get, Query } from '@nestjs/common';
import { SubtractService } from "./subtract.service"

@Controller('subtract')
export class SubtractController {
    constructor(private readonly subtractService: SubtractService) { }

    @Get()
    subtract(@Query("a") a: string, @Query("b") b: string) {
        const numA = parseFloat(a)
        const numB = parseFloat(b)
        if (isNaN(numA) || isNaN(numB)) {
            return { error: "Invalid input" }
        }
        return { result: this.subtractService.subtract(numA, numB) }
    }
}
