import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

function error() {
  throw new HttpException("Verifique os dados e tente novamente.", HttpStatus.BAD_REQUEST)
}

function empty(todo){
  if(todo.length === 0){
    throw new HttpException("Nada encontrado.",HttpStatus.NOT_FOUND);
  }
}
@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService){}

  async create(data: Prisma.TodoCreateInput) {
    try {
      const todo = await this.prisma.todo.create({data});
      return todo;
    }catch(e){
      console.error(e.message);
      error();
    }
  }

  async findAll() {
  try{
    const todo = await this.prisma.todo.findMany();
    if (todo.length > 0)
    empty(todo);
    return todo;
  } catch(e){
    console.error(e.message)
    error()
  }
}

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
