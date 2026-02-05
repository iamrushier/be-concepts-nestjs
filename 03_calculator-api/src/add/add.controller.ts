import { Controller, Get, Query } from '@nestjs/common';
import { AddService } from "./add.service"

@Controller('add')
export class AddController {
    constructor(private readonly addService: AddService) { }

    @Get()
    add(@Query("a") a: string, @Query("b") b: string) {
        const numA = parseFloat(a)
        const numB = parseFloat(b)

        if (isNaN(numA) || isNaN(numB)) {
            return { error: "Invalid input" }
        }
        const result = this.addService.add(numA, numB)
        return { result }
    }
}
