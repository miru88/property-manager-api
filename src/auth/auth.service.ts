import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    //get a user and compare to arguements passed in
    async validateUser(email: string, pass: string) {// TODO strong type this later
        // TODO strong type this later
        const user = await this.userService.findUserByEmail(email);

        if (user && (await bcrypt.compare(pass, user.password))) {
            const {password, ...result} = user;
            return result;
        }

        throw new UnauthorizedException();
    }

    async login(user: any) {// TODO strong type this later
        const payload = {email: user.email, sub: user.userId};

        return{accessToken: this.jwtService.sign(payload)};
    }

}
