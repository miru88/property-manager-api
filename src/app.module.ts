import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [    
    ConfigModule.forRoot({
      isGlobal: true, // 👈 makes env vars available everywhere
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // global guard, gotta use @Public() otherwise
    },
    AppService
  ],
})
export class AppModule {}
