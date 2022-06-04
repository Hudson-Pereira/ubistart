import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './models/local.strategy';
import { JwtStrategy } from './models/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './models/constants';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '5m'}
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy,]
})
export class AuthModule {}
