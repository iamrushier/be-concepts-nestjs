// src/factorial/factorial.module.ts
import { Module } from "@nestjs/common"
import { FactorialService } from "./factorial.service";
import { FactorialController } from "./factorial.controller";
import { MultiplyModule } from "src/multiply/multiply.module";
import { SubtractModule } from "src/subtract/subtract.module";
import { MultiplyService } from "src/multiply/multiply.service";
import { SubtractService } from "src/subtract/subtract.service";

@Module({
    imports: [MultiplyModule, SubtractModule],
    controllers: [FactorialController],
    providers: [FactorialService], // MultiplyService, SubtractService
})
export class FactorialModule { }