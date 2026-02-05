import { Injectable } from '@nestjs/common';

@Injectable()
export class MultiplyService {
    multiply(a: number, b: number): number {
        return a * b
    }
}
