import { Injectable } from '@nestjs/common';

@Injectable()
export class DivideService {
    divide(a: number, b: number): number {
        if (b === 0) throw new Error("Division by zero")
        return a / b
    }
}
