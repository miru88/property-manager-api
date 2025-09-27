import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    @Public()
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req){ //TODO strong type
       return  this.authService.login(req.user);
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('test')
    testJwtGaurd(@Request() req) {
        return req.user;
    }


}
