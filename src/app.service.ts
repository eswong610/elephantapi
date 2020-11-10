import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
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
