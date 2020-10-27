import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, HttpException, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    console.log(user);
    if (user == undefined) {
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'Nothing found',
          }, HttpStatus.FORBIDDEN);
      }
    bcrypt.compare(password, user.password, function(err, result) {
        if (result){
            const { password, ...res} = user;
            return res;
        }else{
            return err;
        }
    });
    
    return user;
  }
}