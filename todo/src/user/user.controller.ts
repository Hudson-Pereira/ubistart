import { Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorador';
import { Role } from '../auth/models/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  roles: Role[];

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(Role.Admin)
  findAll() {
    return this.userService.findAll();
  }

}
