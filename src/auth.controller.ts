import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  @Get('steam')
  @UseGuards(AuthGuard('steam'))
  steamLogin() {
    // initiates the Steam authentication
  }

  @Get('steam/return')
  @UseGuards(AuthGuard('steam'))
  steamAuthReturn(@Req() req) {
    // handles the Steam authentication callback
    return req.user;
  }
}
