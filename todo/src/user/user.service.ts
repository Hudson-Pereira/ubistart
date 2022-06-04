import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { Role } from 'src/auth/models/role.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { LoginDto } from 'src/auth/dto/login.dto';
import { JwtPayload } from 'src/auth/models/jwt.strategy';

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

roles: Role[];
  async create(data: Prisma.UserCreateInput) {
    data.senha = await bcrypt.hash(data.senha, 10);
    try{
      const user = await this.prisma.user.create({data});
      user.senha = undefined;

      return user;
    }catch(e){
      console.error(e.message);
      error();
    };
  }

  async findByLogin(login: LoginDto): Promise<User> {
    
    const user = await this.prisma.user.findFirst({
      where: {
        email: login.email,
      },
    });

    if (!user) {
      throw new HttpException(
        "Dados de login inválidos.",
        HttpStatus.NOT_FOUND
      );
    }

    const senhaIgual = await bcrypt.compare(login.senha, user.senha);

    if (!senhaIgual) {
      throw new HttpException(
        "Dados de login inválidos.",
        HttpStatus.UNAUTHORIZED
      );
    }
    return user
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new HttpException("Token inválido.", HttpStatus.UNAUTHORIZED);
    }

    return user;
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
