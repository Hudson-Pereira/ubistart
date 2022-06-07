import {IsInt, IsNotEmpty, IsString, Max } from "class-validator";

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsInt()
    @IsNotEmpty()
    dayDeadline: number;

    @IsInt()
    @IsNotEmpty()
    monthDeadline: number;

    @IsInt()
    @IsNotEmpty()
    yearDeadline: number;

    @Max(1)
    concluted: number;

    @IsNotEmpty()
    @IsInt()
    userId: number;

}
