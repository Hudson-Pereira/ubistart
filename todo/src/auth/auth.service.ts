import { Roles } from "./decorators/roles.decorador";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { JwtPayload } from "./models/jwt.strategy";
import { UserService } from "src/user/user.service";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginUserDto: LoginDto) {
    const user = await this.usuarioService.findByLogin(loginUserDto);

    const token = this._createToken(user);
    return {
      idUser: user.id,
      role: user.role,
      email: user.email,
      senha: user.senha,
      ...token,
    };
  }
  private _createToken({ id, email, role, senha }: User): any {
    const user: JwtPayload = { id, email, role, senha };
    const acessToken = this.jwtService.sign(user);
    return {
      expiresIn: '5m',
      acessToken,
    };
  }
}
