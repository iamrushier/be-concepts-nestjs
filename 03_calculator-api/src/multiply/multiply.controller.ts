import { Controller, Get, Query } from '@nestjs/common';
import { MultiplyService } from "./multiply.service"

@Controller('multiply')
export class MultiplyController {
    constructor(private readonly multiplyService: MultiplyService) { }

    @Get()
    multiply(@Query("a") a: string, @Query("b") b: string) {
        const numA = parseFloat(a)
        const numB = parseFloat(b)
        if (isNaN(numA) || isNaN(numB)) {
            return { error: "Invalid input" }
        }
        return { result: this.multiplyService.multiply(numA, numB) }
    }
}
