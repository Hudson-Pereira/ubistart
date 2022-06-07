import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
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
    throw new HttpException("Item concluído.", HttpStatus.BAD_REQUEST)}
}

function verifyDeadline(todo){
  const date = new Date()
  if(todo.concluted == 0){
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

  async findAll(user: User) {
  try{
    if(user.role === true){
    const todo = await this.prisma.todo.findMany({
      skip: 0,
      take: 3,
    });  
    empty(todo)
    return todo;  
  }
    const todo = await this.prisma.todo.findMany({
      where: {
        userId: user.id
      },
        skip: 0,
        take: 2,

      });

    empty(todo);
    return todo;
  } catch(e){
    error(e)
  }
}

  async findOne(id: number, user: User) {
    try {
      const todo = await this.prisma.todo.findUnique({where: {id}});
      if(user.id === todo.userId){
      notFound(todo);
        let concluted = verifyDeadline(todo);
        if(todo.concluted > 0){
          concluted = "Item concluído.";
        }
      return [`Situation: ${concluted}.`, `Criado por: ${user.email}.`, `Description: ${todo.description}`];
      }
      return "Este item pertence a outro usuário."
    }catch(e){
      error(e)
    };
  }

  async findLate() {
    try {
      const todo = await this.prisma.todo.findMany({where: {late: 1}});
      empty(todo);
      return todo;
    }catch(e){
      error(e)
    };
  }

    async update(id: number, data: UpdateTodoDto, user: User) {
    try{
      const todoVerify = await this.prisma.todo.findUnique({where: {id}});
      if(user.id === todoVerify.userId){
      notFound(todoVerify)
      conclutedVerify(todoVerify)
      const todo = await this.prisma.todo.update({ data, where: {id}});

      return todo;
      }
      return "Este item pertence a outro usuário."
    }catch(e){
      error(e)
    }
  }

}
