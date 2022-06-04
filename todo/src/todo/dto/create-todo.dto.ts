import {IsInt, IsNotEmpty, IsString } from "class-validator";

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

    @IsInt()
    concluted: number;

    @IsInt()
    userId: number;

}
