import { Injectable } from '@nestjs/common';
import {ConfigService} from '@nestjs/config'

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'Elephant Api';
  }

  googleLogin(req) {
    if (!req.user){
      return ('no user from google')
    }
    return {
      message: "user info from google",
      user: req.user
    }
  }
}
