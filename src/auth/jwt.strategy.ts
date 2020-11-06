import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserService } from '../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  //could do a database lookup in our validate() method to extract more information about the user
  async validate(payload: any) {
    var dbUser = await this.userService.findOneByUsername(payload.username)
    console.log('jwt.strategy.payload')
    console.log(payload)
    //add in things you want to add to user object
    if (dbUser.is_educator) {
        return { 
            _id: dbUser.id,
            name: dbUser.name, 
            email: dbUser.email, 
            is_educator: dbUser.is_educator,
            is_verified: dbUser.is_verified,
            telephone: dbUser.phone_number,
            gender: dbUser.gender,
            rating: dbUser.educator_rating,
            image_url: dbUser.image_url
          };
    } 
  }
}