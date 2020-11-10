import { Controller, Get, Request, Post, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthGuard } from '@nestjs/passport'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';


@Controller()

export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private userService: UserService,
    ) {}


  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req)  {
    return this.appService.googleLogin(req)
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log('this is req.body')
    console.log(req.body);
    console.log('this is req.user')
    console.log(req.user)
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user)
    return this.userService.findById(req.user._id)
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
