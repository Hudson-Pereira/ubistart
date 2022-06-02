import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsInt()
    @IsNotEmpty()
    deadline: number;

    @IsInt()
    @IsNotEmpty()
    concluted: number;

}
