// src/factorial/factorial.service.ts
import { Injectable } from "@nestjs/common"
import { MultiplyService } from "src/multiply/multiply.service";
import { SubtractService } from "src/subtract/subtract.service";

@Injectable()
export class FactorialService {
    constructor(
        private readonly multiplyService: MultiplyService,
        private readonly subtractService: SubtractService
    ) { }

    factorial(a: number) {
        let fact = 1;
        while (a > 0) {
            fact = this.multiplyService.multiply(fact, a);
            a = this.subtractService.subtract(a, 1)
        }
        return fact
    }
}
