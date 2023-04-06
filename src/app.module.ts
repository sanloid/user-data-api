import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OperatorsModule } from './operators/operators.module';
import { GatewayModule } from './gateway/gateway.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    OperatorsModule,
    GatewayModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
