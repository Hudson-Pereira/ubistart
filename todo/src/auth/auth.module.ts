import { RolesGuard } from "./guards/roles.guard";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./models/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: "jwt",
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    PrismaService,
    RolesGuard,
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
