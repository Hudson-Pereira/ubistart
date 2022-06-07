import { Controller, Get, Post, Body, Patch, Param, UseGuards, Headers, Req} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from 'src/auth/decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/auth/models/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorador';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  findAll(@UserDecorator() user: User){
    return this.todoService.findAll(user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/id/:id')
  findOne(@Param('id') id: string, @UserDecorator() user: User) {
    return this.todoService.findOne(+id, user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @Get('/late')
  findLate() {
    return this.todoService.findLate();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch('/id/:id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @UserDecorator() user: User) {
    return this.todoService.update(+id, updateTodoDto, user);
  }

}
