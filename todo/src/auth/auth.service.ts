import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(private userService: UserService,
              private jwtService: JwtService) {}
  
  async validateUser(email:string, senha:string) {
    const user = await this.userService.getByEmail(email);
    if (user && user.senha === senha){
      const { id, email } = user;
      return { id, email };
    }
    return null
  }

  async login(user: any){
    const payload = {
      email: user.email, sub:user.id
    };
    return {
      acess_token: this.jwtService.sign(payload),
    };
  }

}
