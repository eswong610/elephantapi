
import { UserService } from '../user/user.service';
import { Injectable, UnauthorizedException, HttpException, HttpStatus} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    //   private usersService: UsersService,
      private userService: UserService,
      private jwtService: JwtService
    ) {}

  


  async validateUser(username: string, pass: string): Promise<any> {
    // const staticuser = await this.usersService.findOne(username);
    const user = await this.userService.findOneByUsername(username)
    
    console.log('from authservice')
    console.log(user);

    if (user.id == undefined) {
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'Nothing found',
            }, HttpStatus.FORBIDDEN);
    }
    bcrypt.compare(pass, user.password, function(err, result) {
        if (result){
            const { password, ...res} = user;
            console.log('passed bcrypt')
            return res;
        }else{
            return err;
        }
    });

    // if (staticuser && staticuser.password === pass) {
    //   const { password, ...result } = staticuser;
    //   return result;
    // }
    // return null;
  }

  async login(user: any) {
    // const payload = { username: user.username, sub: user.userId };
    console.log('login payload')
    console.log(user);
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  
}