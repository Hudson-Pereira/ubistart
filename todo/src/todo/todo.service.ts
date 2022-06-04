import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

function error(e) {
  console.error(e.message)
  throw new HttpException("Verifique os dados e tente novamente.", HttpStatus.BAD_REQUEST)
}

function empty(todo){
  if(todo.length === 0){
    throw new HttpException("Nada encontrado.",HttpStatus.NOT_FOUND);
  }
}

function notFound(todo){
  if(!todo) {
    throw new HttpException("Nada encontrado.",HttpStatus.NOT_FOUND);
  }
}

function conclutedVerify(todo){
  if(todo.concluted > 0){ 
    throw new HttpException("Item concluído não pode ser alterado.", HttpStatus.BAD_REQUEST)}
}

function verifyDeadline(todo){
  const date = new Date()
  if(todo.concluted !== 0){
    if(todo.yearDeadline <= date.getFullYear()){
      if(todo.monthDeadline <= date.getMonth()+1){
        if(todo.dayDeadline < date.getDate()){
          return "Tarefa vencida."
        }
      }
    }
  }
  return `Tarefa vencendo em ${todo.dayDeadline}/${todo.monthDeadline}/${todo.yearDeadline}`
}

// function verifyUser(todo){
//   if(todo.userId !==)
// TODO: fazer depois da autenticação, tambem para busca ALL}
@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService){}

  async create(data: Prisma.TodoUncheckedCreateInput) {
    try {
      const todo = await this.prisma.todo.create({data});
      return todo;
    }catch(e){
      error(e);
    }
  }

  async findAll() {
  try{
    const todo = await this.prisma.todo.findMany();
    empty(todo);
    return todo;
  } catch(e){
    error(e)
  }
}

  async findOne(id: number) {
    try {
      const todo = await this.prisma.todo.findUnique({where: {id}});
      notFound(todo);
      // verifyUser(todo);
      return [verifyDeadline(todo), todo];
    }catch(e){
      error(e)
    };
  }

  async update(id: number, data: UpdateTodoDto) {
    try{
      const todoVerify = await this.prisma.todo.findUnique({where: {id}});
      notFound(todoVerify)
      conclutedVerify(todoVerify)
      const todo = await this.prisma.todo.update({ data, where: {id}});

      return todo;
    }catch(e){
      error(e)
    }
  }

}
