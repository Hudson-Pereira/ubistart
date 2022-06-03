import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

function error() {
  throw new HttpException("Verifique os dados e tente novamente.", HttpStatus.BAD_REQUEST)
}

function empty(user){
  if(user.length === 0){
    throw new HttpException("Nada encontrado.",HttpStatus.NOT_FOUND);
  }
}

@Injectable()
export class UserService {
constructor(private prisma: PrismaService){}

  async create(data: Prisma.UserCreateInput) {
    try{
      const user = await this.prisma.user.create({data});
      return user;
    }catch(e){
      console.error(e.message);
      error();
    };
  }

  async findAll() {
    try{
      const user = await this.prisma.user.findMany();
      empty(user)
      return user; 
    }catch(e){
      console.error(e.message);
      error();
    }
  }

}
