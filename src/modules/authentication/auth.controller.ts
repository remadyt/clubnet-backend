import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/modules/authentication/auth.service';
import { SteamAuthGuard } from 'src/modules/authentication/steam.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('steam')
  @UseGuards(SteamAuthGuard)
  steamLogin() {
    // initiates the Steam authentication
  }

  @Get('steam/return')
  @UseGuards(SteamAuthGuard)
  async steamAuthReturn(@Req() req, @Res() res) {
    const steamId = req.user.steamID.match(/\d+$/)[0];
    const user = await this.authService.getUserBySteamId(steamId);
    if (!user) {
      res.redirect(`${process.env.APP_DOMAIN}/profile?steamId=${steamId}`);
      return;
    }

    await this.authService.updateSteamData(req.user);

    const customToken = await this.authService.createCustomTokenById(
      user.id.split('-')[1],
    );

    res.redirect(`${process.env.APP_DOMAIN}?customToken=${customToken}`);
  }
}
