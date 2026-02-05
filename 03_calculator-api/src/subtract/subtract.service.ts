import { Injectable } from '@nestjs/common';

@Injectable()
export class SubtractService {
    subtract(a: number, b: number): number {
        return a - b;
    }
}
