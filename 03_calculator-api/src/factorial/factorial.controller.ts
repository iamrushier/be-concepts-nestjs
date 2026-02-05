// src/factorial/factorial.controller.ts
import { Controller, Get, Query } from "@nestjs/common";
import { FactorialService } from "./factorial.service";

@Controller("factorial")
export class FactorialController {
    constructor(private readonly factService: FactorialService) { }

    @Get()
    factorial(@Query("a") a: string) {
        const numA = parseFloat(a)

        if (isNaN(numA)) {
            return { error: "Invalid input" }
        }
        return { result: this.factService.factorial(numA) }
    }
}