import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
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

  async getByEmail(email: string){
    return await this.prisma.user.findUnique({where:{email}})
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
