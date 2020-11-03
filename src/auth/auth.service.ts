
import { UserService } from '../user/user.service';
import { Injectable, UnauthorizedException, HttpException, HttpStatus} from '@nestjs/common';
// import { bcryptcompare } from '../helpers/bcrypt.js'
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
    const isPasswordMatching = await bcrypt.compare(
      pass,
      user.password
    );
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
    user.password = undefined;
    return user;
    // const user = await this.userService.findOneByUsername(username).then((res)=>{
    //   return new Promise(function(resolve, reject) {
    //     bcrypt.compare(pass, res.password, function(err, result) {
    //         if (err) {
    //              reject(err);
    //         } else {
    //              console.log('gppd')
    //              resolve(res);
    //         }
    //     });
    // }).then((data)=>{
    //   // console.log('data')
    //   // console.log(data)
    //   return data
    // }); 
    // })
    
    // return user;
    
    
    // if (user) {

    //   await bcrypt.compare(pass, user.password, function(err, result) {
    //     console.log('bcrypto')  
    //     if (result){
    //           const { password, ...res} = user;
    //           console.log('from bcrypt')
    //           console.log(res);
    //           return res;
    //       }else{
    //           console.log('err here')
    //           return err;
    //       }
    //     });
    // }
    //bcrypt not returning anything

    // if (user.id == undefined) {
    //     throw new HttpException({
    //         status: HttpStatus.FORBIDDEN,
    //         error: 'Nothing found',
    //         }, HttpStatus.FORBIDDEN);
    // }
    // return bcrypt.compare(pass, user.password, function(err, result) {
    //   console.log('bcrypto')  
    //   if (result){
    //         const { password, ...res} = user;
    //         console.log('from bcrypt')
    //         return res;
    //     }else{
    //         console.log('err here')
    //         return err;
    //     }
   

 
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

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  
}